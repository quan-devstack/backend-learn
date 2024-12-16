// build http server with express framework
const express = require("express");
const expresLayout = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const indexRoute = require("./src/routes/index-route");
const app = express();

// config session
app.use(
  session({
    name: "app_session",
    secret: "5QKuEMEdjP",
    resave: false,
    saveUninitialized: true,
  })
);

// config flash sesion
app.use(flash());

// config static file
app.use(express.static("src/public"));

// config template-engine
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(expresLayout);
app.set("layouts", "./layout");

// config body-parser
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// config routes
app.use(indexRoute);

// 404 code
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

let port = 3400;
app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});
