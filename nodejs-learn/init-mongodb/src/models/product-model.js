const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    match: [/^[a-zA-Z0-9]+$/, "Product name cannot contain special characters"],
  },

  price: {
    type: Number,
    required: [true, "Please enter product price"],
  },

  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
  },

  image: {
    type: String,
    required: [true, "Please choose a image"],
  },
});

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
