const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Product name cannot be smaller than 3 characters"],
    maxlength: [30, "Product name must not over than 30 character"],
  },

  price: {
    type: Number,
    required: true,
    min: [0, "Price must not be negative !"],
    max: [3000, "Price must not over than 3000$"],
  },

  image: {
    type: String,
  },

  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "categories",
  },
});

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
