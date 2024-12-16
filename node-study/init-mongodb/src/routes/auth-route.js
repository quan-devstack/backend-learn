const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");

router.get("/register", authController.showFormRegister);
router.post("/register", authController.signUp);
router.get("/login", authController.showFormLogin);
router.post("/login", authController.signIn);
router.get("/logout", authController.signOut);

module.exports = router;
