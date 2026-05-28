const userModel = require("../models/userCharts");

exports.getAllUser = async (req, res) => {
    try {
        const currentUserId = req.user.userId;
        const users = await userModel.getAllUser();
        // Remove logged-in user from list
        const filteredUsers = users.filter(
            user => user.id !== currentUserId
        );
        return res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Failed to retrieve users:", error);
        return res.status(500).json({ message: "Failed to retrieve users" });
    }
};