const express = require("express");
const router = express.Router();
const productController = require("../controllers/product-controller");
const getUploadMiddleware = require("../middlewares/upload-middleware");

router.get("/add", productController.showFormCreate);
router.post(
  "/add",
  getUploadMiddleware("product", "image"),
  productController.createProduct
);
router.get("/edit/:id", productController.showFormEdit);
router.post("/edit/:id", productController.updateProduct);
router.get("/delete/:id", productController.deleteSingleProduct);
router.post("/search", productController.searchProduct);
router.get("/sort/asc", productController.sortAsc);
router.get("/sort/desc", productController.sortDesc);

module.exports = router;
