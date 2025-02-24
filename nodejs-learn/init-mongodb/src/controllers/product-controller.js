const productModel = require("../models/product-model");
const categoryModel = require("../models/category-model");
const { log } = require("handlebars/runtime");

const productController = {
  readAllProduct: async (req, res) => {
    let products = await productModel.find({}).populate("category");
    return res.render("product-view/index", { products });
  },

  showCreateForm: async (req, res) => {
    let categories = await categoryModel.find({});
    return res.render("product-view/create", { categories });
  },

  createProduct: async (req, res) => {
    const { name, price, category, image } = req.body;
    let categories = await categoryModel.find({});
    try {
      await productModel.create({
        name,
        price,
        category,
        image,
      });
      return res.redirect("/");
    } catch (error) {
      let errors = [];
      if (error.name === "ValidationError") {
        for (let field in error.errors) {
          errors[field] = error.errors[field].message;
        }
      }
      console.log(errors);
      return res.render("product-view/create", { errors, categories });
    }
  },

  showUpdateForm: async (req, res) => {
    let productId = req.params.id;
    let categories = await categoryModel.find({});
    let productData = await productModel.findById(productId);
    return res.render("product-view/update.hbs", { productData, categories });
  },

  updateProduct: async (req, res) => {
    let productId = req.params.id;
    const { name, price, category, image } = req.body;
    try {
      await productModel.findByIdAndUpdate(productId, {
        name,
        price,
        category,
        image,
      });
      return res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },

  deleteProduct: async (req, res) => {
    const productId = req.params.id;
    try {
      await productModel.findByIdAndDelete(productId);
      console.log("Demo Test");
      return res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },

  sortAscProduct: async (req, res) => {
    try {
      let products = await productModel
        .find()
        .sort({ name: 1 })
        .populate("category");
      res.render("product-view/index", { products });
    } catch (error) {
      console.error(error);
    }
  },

  sortDescProduct: async (req, res) => {
    try {
      let products = await productModel
        .find()
        .sort({ name: -1 })
        .populate("category");
      res.render("product-view/index", { products });
    } catch (error) {
      console.error(error);
    }
  },

  searchProduct: async (req, res) => {
    const { keyword } = req.body;
    try {
      let products = await productModel
        .find({
          name: new RegExp(keyword, "i"),
        })
        .populate("category");

      if (products.length === 0) {
        return res.render("product-view/index", {
          message: "Product Not Found",
        });
      } else {
        res.render("product-view/index", { products });
      }
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = productController;
