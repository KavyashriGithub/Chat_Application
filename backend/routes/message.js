const router = require("express").Router();
const messageController = require("../controllers/messageController");
const userMiddleware = require("../middleware/user");

router.get("/messages/:receiverId", userMiddleware, messageController.getChatMessages);

module.exports = router;