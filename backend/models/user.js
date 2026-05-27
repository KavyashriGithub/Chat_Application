const database = require("../config/knex");
const { v4: uuidv4 } = require("uuid");

// CREATE USER (Signup)
exports.createUser = async (username, email, password) => {
 await database("user").insert({
        id: uuidv4(),
        user_name: username,
        email,
        password
    });
};

// GET USER BY EMAIL (Used in Signup + Login)
exports.getUserByEmail = async (email) => {
    return await database("user")
        .select("*")
        .where({ email })
};

