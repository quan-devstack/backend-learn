const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");

router.get("/login", authController.signIn);
router.post("/login", authController.handleSignin);

module.exports = router;
