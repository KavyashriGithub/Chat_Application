const userModel = require("../models/userCharts");
 
exports.getAllUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        console.log("hitting-->",req.user.userId)
        const user = await userModel.getAllUser();
        console.log("user->",user);
        return res.status(200).json(user);
    } catch (error) {
        console.error("Failed to retrieve user:", error);
        return res.status(500).json({ message: "Failed to retrieve user" });
    }
}