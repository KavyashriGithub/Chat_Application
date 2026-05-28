const router = require("express").Router();
const groupController = require("../controllers/groupController");
const userMiddleware = require("../middleware/user");
const groupMessageController = require("../controllers/groupMessageController");
const groupMemberController = require("../controllers/groupMemberController");
router.post("/groups/create", userMiddleware, groupController.createGroup);
router.get("/groups/all", userMiddleware, groupController.getGroups);
router.get("/groups/messages/:groupId",userMiddleware,groupMessageController.getGroupMessages);

router.get(
  "/groups/members/:groupId",
  userMiddleware,
  groupMemberController.getGroupMembers
);
module.exports = router;