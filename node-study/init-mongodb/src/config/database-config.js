const mongoose = require("mongoose");

const connectString = "mongodb://127.0.0.1:27017/data-demo";

const connectDatabase = async () => {
  try {
    await mongoose.connect(connectString);
    console.log("database (data-demo) is connected");
  } catch (error) {
    console.log("connection error: " + error);
  }
};

module.exports = connectDatabase;
