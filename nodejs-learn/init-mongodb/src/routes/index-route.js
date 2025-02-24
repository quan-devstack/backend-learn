const express = require("express");
const router = express.Router();
const productRoute = require("./product-route");
const categoryRoute = require("./category-route");
const authRoute = require("./auth-route");
const authMiddleware = require("../middlewares/auth-middleware");

router.get("/", (req, res) => {
  res.render("home.hbs");
});

router.use(authRoute);
router.use("/product", authMiddleware, productRoute);
router.use("/category", authMiddleware, categoryRoute);

module.exports = router;
