const express = require("express");
const router = express.Router();
const productController = require("../controllers/product-controller");

router.get("/", productController.readAllProduct);
router.get("/create", productController.showCreateForm);
router.post("/create", productController.createProduct);
router.get("/update/:id", productController.showUpdateForm);
router.post("/update/:id", productController.updateProduct);
router.get("/delete/:id", productController.deleteProduct);
router.get("/sort/asc", productController.sortAscProduct);
router.get("/sort/desc", productController.sortDescProduct);
router.post("/search", productController.searchProduct);

module.exports = router;
