const messageModel = require("../models/message");

exports.getChatMessages = async (req, res) => {
  try {
    const senderId = req.user.userId;
    const { receiverId } = req.params;

    const messages = await messageModel.getMessages(senderId, receiverId);
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};