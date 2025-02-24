require("dotenv").config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const indexRoute = require("./src/routes/index-route");
const { isEqual, calNumOrder, isSelected } = require("./src/utils/hbs");
const { formatPrice } = require("./src/utils/format-data");

const app = express();

// config session
const timeout = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: timeout, secure: false },
  })
);

// config session value
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.role = req.session.role;
  next();
});

// config database
const DBSTRING = process.env.DBSTRING;
const connectDB = async () => {
  try {
    if (!DBSTRING) {
      throw new Error("DBSTRING is not defined. Please check your .env file.");
    }
    await mongoose.connect(`${DBSTRING}/demo`);
    console.log("Database is connected");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};
connectDB();

// config template engine
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "hbs");

// register hbs hepers
hbs.registerHelper("eq", isEqual);
hbs.registerHelper("formatPrice", formatPrice);
hbs.registerHelper("calNumOrder", calNumOrder);
hbs.registerHelper("isSelected", isSelected);

// config middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(indexRoute);

// config server
const PORT = process.env.PORT || 4000;
try {
  app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}/`);
  });
} catch (error) {
  console.error("Server failed to start:", error);
}

module.exports = app;
