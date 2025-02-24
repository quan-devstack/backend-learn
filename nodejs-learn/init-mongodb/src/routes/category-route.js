const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category-controller");

router.get("/", categoryController.readAllCategory);
router.get("/create", categoryController.showCreateForm);
router.post("/create", categoryController.createCategory);
router.get("/update/:id", categoryController.showUpdateForm);
router.post("/update/:id", categoryController.updateCategory);
router.get("/delete/:id", categoryController.deleteCategroy);

module.exports = router;
