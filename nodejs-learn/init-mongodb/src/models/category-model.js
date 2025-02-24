const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please enter category name"],
  },

  desc: {
    type: String,
    require: [true, "Please enter category description"],
  },
});

const categoryModel = mongoose.model("Category", categorySchema);
module.exports = categoryModel;
