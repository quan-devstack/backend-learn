const express = require("express");
const router = express.Router();
const authControlller = require("../controllers/auth-controller");

router.get("/signup", authControlller.showSignUpForm);
router.post("/signup", authControlller.signUp);

router.get("/signin", authControlller.showSignInForm);
router.post("/signin", authControlller.signIn);

router.get("/signout", authControlller.signOut);

module.exports = router;
