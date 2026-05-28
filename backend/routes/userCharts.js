const router = require("express").Router();
const userChartsController = require("../controllers/userChartsController");
const userMiddleware = require("../middleware/user");
router.get("/user/all", userMiddleware, userChartsController.getAllUser);
module.exports = router;