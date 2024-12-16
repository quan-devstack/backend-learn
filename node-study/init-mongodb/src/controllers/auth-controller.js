const userModel = require("../models/user-model");
const { hashString, compareString } = require("../utils/hashString");

const authController = {
  showFormRegister: (req, res) => {
    res.render("auth-views/register", { layout: "auth-views/layout" });
  },

  showFormLogin: (req, res) => {
    res.render("auth-views/login", { layout: "auth-views/layout" });
  },

  signUp: async (req, res) => {
    const { username, password, role } = req.body;
    const user = new userModel({
      username,
      password,
      role,
    });

    try {
      await user.validate();
      user.password = hashString(password);
      await userModel.create(user);
      res.redirect("/");
    } catch (error) {
      if (error.name === "ValidationError") {
        let inputError = {};
        for (let field in error.errors) {
          inputError[field] = error.errors[field].message;
        }
        res.render("auth-views/register", {
          inputError,
          user,
          layout: "auth-views/layout",
        });
      }
    }
  },

  signIn: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await userModel.findOne({ username: username });
      if (user) {
        let compareResult = compareString(password, user.password);
        if (compareResult === true) {
          req.session.username = user.username;
          req.session.role = user.role;
          res.redirect("/");
        }
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        let inputError = {};
        for (let field in error.errors) {
          inputError[field] = error.errors[field].message;
        }
        res.render("auth-views/login", {
          inputError,
          user,
          layout: "auth-views/layout",
        });
      }
    }
  },

  signOut: (req, res) => {
    req.session.destroy();
    res.redirect("/auth/login");
  },
};

module.exports = authController;
