const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  role: {
    type: String,
    default: "User",
  },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
