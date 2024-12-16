const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const hbs = require("hbs");
const mongodb = require("./src/config/database-config");
const indexRoutes = require("./src/routes/index-route");
const productRoutes = require("./src/routes/product-route");
const categoryRoutes = require("./src/routes/category-route");
const authRoutes = require("./src/routes/auth-route");
const {
  checkLogin,
  checkAdminRole,
} = require("./src/middlewares/auth-middleware");

// config express.js
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));

// config session timeout
const timeout = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: timeout, secure: false },
  })
);

// config session value in template
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.role = req.session.role;
  next();
});

// config database
mongodb();

// register hbs helper
hbs.registerHelper("eq", function (a, b) {
  return a === b;
});

// config template engine
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "hbs");

//config morgan
app.use(morgan("dev"));

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config routes
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/product", checkAdminRole);
app.use("/category", checkAdminRole);
app.use("/product", checkLogin, productRoutes);
app.use("/category", checkLogin, categoryRoutes);

// error-handling
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// config server
let port = 3005;
app.listen(port, () => {
  console.log(`server is running on: http://localhost:${port}/`);
});

module.exports = app;
