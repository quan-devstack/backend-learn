const express = require("express");
const { userController } = require("../controllers/user-controller");

const router = express.Router();

router.get("/", userController.userPage);
router.get("/add", userController.viewUser);
router.get("/active/:userId", userController.viewId); // dynamic-route

module.exports = router;
