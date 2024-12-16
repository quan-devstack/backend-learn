const express = require("express");
const userRouter = require("./user-route");
const authRouter = require("./auth-route");
const homeController = require("../controllers/home-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();
router.get("/", homeController.viewHomepage);
router.use("/auth", authRouter);
router.use("/user", userRouter);

module.exports = router;
