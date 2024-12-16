const productModel = require("../models/product-model");
const categoryModel = require("../models/category-model");

const productController = {
  showFormCreate: async (req, res) => {
    let categoryList = await categoryModel.find({});
    res.render("product-views/add", { categoryList });
  },

  showFormEdit: async (req, res) => {
    let id = req.params.id;
    let categoryList = await categoryModel.find({});
    let productValue = await productModel.findById(id);
    res.render("product-views/edit", {
      productValue,
      categoryList,
    });
  },

  createProduct: async (req, res) => {
    const { name, price, image, category } = req.body;
    const product = new productModel({
      name,
      price,
      image,
      category,
    });
    let prefix = req.dateValue;
    product.image = prefix + "_" + req.file.originalname;

    try {
      await productModel.create(product);
      res.redirect("/");
    } catch (error) {
      if (error.name === "ValidationError") {
        let inputError = {};
        for (let field in error.errors) {
          inputError[field] = error.errors[field].message;
        }
        res.render("product-views/add", {
          inputError,
          product,
        });
      }
    }
  },

  readAllProduct: async (req, res) => {
    let products = await productModel.find({}).populate("category");
    res.render("product-views/index", { products });
  },

  updateProduct: async (req, res) => {
    let id = req.params.id;
    const { name, price, image, category } = req.body;
    const newProduct = new productModel({
      name,
      price,
      image,
      category,
    });
    try {
      await productModel.findByIdAndUpdate(id, newProduct);
      res.redirect("/");
    } catch (error) {
      console.error(error);
    }
  },

  deleteSingleProduct: async (req, res) => {
    const id = req.params.id;
    try {
      await productModel.findByIdAndDelete(id);
      res.redirect("/");
    } catch (error) {
      console.error(error);
    }
  },

  searchProduct: async (req, res) => {
    let keyword = req.body.keyword;
    try {
      let products = await productModel
        .find({
          name: new RegExp(keyword, "i"),
        })
        .populate("category");

      if (products.length === 0) {
        return res.render("product-views/index", {
          message: "Product Not Found",
        });
      } else {
        res.render("product-views/index", { products });
      }
    } catch (error) {
      console.error(error);
    }
  },

  sortAsc: async (req, res) => {
    try {
      let products = await productModel
        .find()
        .sort({ name: 1 })
        .populate("category");
      res.render("product-views/index", { products });
    } catch (error) {
      console.error(error);
    }
  },

  sortDesc: async (req, res) => {
    try {
      let products = await productModel
        .find()
        .sort({ name: -1 })
        .populate("category");
      res.render("product-views/index", { products });
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = productController;
