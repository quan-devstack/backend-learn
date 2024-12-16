const categoryModel = require("../models/category-model");

const categoryController = {
  showFormCreate: (req, res) => {
    res.render("category-views/add");
  },

  showFormEdit: async (req, res) => {
    let id = req.params.id;
    let categoryValue = await categoryModel.findById(id);
    console.log(categoryValue.description);
    res.render("category-views/edit", { categoryValue });
  },

  createCategory: async (req, res) => {
    const { name, description } = req.body;
    const category = new categoryModel({
      name,
      description,
    });
    try {
      await categoryModel.create(category);
      res.redirect("/category");
    } catch (error) {
      console.error(error);
    }
  },

  readAllCategory: async (req, res) => {
    try {
      let categories = await categoryModel.find({});
      res.render("category-views/index", { categories });
    } catch (error) {
      console.error("error: " + error);
    }
  },

  updateCategory: async (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;
    const newCategory = new categoryModel({
      name,
      description,
    });
    try {
      await categoryModel.findByIdAndUpdate(id, newCategory);
      res.redirect("/category");
    } catch (error) {
      console.error("error: " + error);
    }
  },

  deleteSingleCategory: async (req, res) => {
    const id = req.params.id;
    try {
      await categoryModel.findByIdAndDelete(id);
      res.redirect("/category");
    } catch (error) {
      console.error("error: " + error);
    }
  },
};

module.exports = categoryController;
