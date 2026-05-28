// bcrypt to hash passwords securely.
//  jwt to generate JSON Web Tokens for authentication.
//  userModel to interact with the user data in the database.
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
// Signup controller to handle user registration 
exports.signup = async (req, res) => {
    try{
        const { username, email, password } = req.body || {};
        if(!username || !email || !password){
            return res.status(400).send({ message: "Username, email and password are required" });
        }
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser.length > 0) {
            return res.status(400).send({ message: "Email already exists" });
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).send({ message: "Password must be at least 8 characters long and contain both letters and numbers" });
        }
       const hashedPassword = await bcrypt.hash(password, 10);
      await userModel.createUser(username, email, hashedPassword);
       return res.status(201).send({ message: "User registered successfully" });
    }
    catch (error) {
        console.error("Failed to signup:", error);
       return res.status(400).json({ message: "Failed to signup, try again later" });
    }
}
// Login controller to handle user authentication and token generation.
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ message:"Email and password are required" });
        }
        const users = await userModel.getUserByEmail(email);
        const user = users[0]; 
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.status(200).json({ message:"Login successful", token });
    //    return res.status(200).json({ token });
    } catch (error) {
        console.error("Failed to login:", error.message);
       return res.status(500).json({ message: "Failed to login, try again later" });
    }
}