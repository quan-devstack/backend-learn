const express = require("express");
const router = express.Router();
const productController = require("../controllers/product-controller");

router.get("/", productController.readAllProduct);

router.get("/user", (req, res) => {
  res.render("user");
});

module.exports = router;
