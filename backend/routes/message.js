const router = require("express").Router();
const messageController = require("../controllers/groupMessageController");
const userMiddleware = require("../middleware/user");
const messageModel = require('../models/message')
// router.get("/messages/:receiverId", userMiddleware, messageController.getChatMessages);

// Fetch all messages between logged in user and friend
router.get("/messages/:friendId", userMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const friendId = req.params.friendId;
    const messages = await messageModel.getMessagesBetweenUsers(userId, friendId);
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});
module.exports = router;