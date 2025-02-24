const categoryModel = require("../models/category-model");

const categoryController = {
  readAllCategory: async (req, res) => {
    const categories = await categoryModel.find({});
    return res.render("category-view/index.hbs", { categories });
  },

  showCreateForm: (req, res) => {
    return res.render("category-view/create.hbs");
  },

  createCategory: async (req, res) => {
    const { name, desc } = req.body;
    try {
      await categoryModel.create({
        name,
        desc,
      });
      return res.redirect("/category");
    } catch (error) {
      console.log(error);
    }
  },

  showUpdateForm: async (req, res) => {
    let categoryId = req.params.id;
    let categoryData = await categoryModel.findById(categoryId);
    return res.render("category-view/update.hbs", { categoryData });
  },

  updateCategory: async (req, res) => {
    const categoryId = req.params.id;
    const { name, desc } = req.body;
    try {
      await categoryModel.findByIdAndUpdate(categoryId, { name, desc });
      return res.redirect("/category");
    } catch (error) {
      console.log(error);
    }
  },

  deleteCategroy: async (req, res) => {
    const categoryId = req.params.id;
    try {
      await categoryModel.findByIdAndDelete(categoryId);
      return res.redirect("/category");
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = categoryController;
