const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category-controller");

router.get("/", categoryController.readAllCategory);
router.get("/add", categoryController.showFormCreate);
router.post("/add", categoryController.createCategory);
router.get("/edit/:id", categoryController.showFormEdit);
router.post("/edit/:id", categoryController.updateCategory);
router.get("/delete/:id", categoryController.deleteSingleCategory);

module.exports = router;
