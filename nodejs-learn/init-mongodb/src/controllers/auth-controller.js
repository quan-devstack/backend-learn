const { log } = require("handlebars/runtime");
const userModel = require("../models/user-model");
const { hashString, compareString } = require("../utils/hash-string");

const authController = {
  // show signup
  showSignUpForm: (req, res) => {
    return res.render("auth-view/signup", { errors: [] });
  },

  // handle signup
  signUp: async (req, res) => {
    const { username, password, confirm } = req.body;
    let errors = [];

    try {
      await userModel.validate(req.body);

      const isUserExist = await userModel.findOne({ username: username });
      if (isUserExist) {
        errors.db_error = "Username is already used";
      }

      if (!confirm) {
        errors.confirm_error = "Confirm password is required";
      } else if (password !== confirm) {
        errors.confirm_error = "Password does not match";
      }

      if (Object.keys(errors).length > 0) {
        return res.render("auth-view/signup", { errors, formData: req.body });
      }

      const hashedPassword = hashString(password);
      await userModel.create({
        username,
        password: hashedPassword,
      });
      return res.redirect("/signin");
    } catch (error) {
      if (error.name === "ValidationError") {
        for (let field in error.errors) {
          errors[field] = error.errors[field].message;
        }
      }
      return res.render("auth-view/signup", { errors });
    }
  },

  // show signin
  showSignInForm: (req, res) => {
    return res.render("auth-view/signin");
  },

  // handle signin
  signIn: async (req, res) => {
    const { username, password } = req.body;
    let errors = [];

    try {
      await userModel.validate(req.body);

      const userData = await userModel.findOne({ username: username });
      if (!userData) {
        errors.db_error = "Username is not exist, please try again";
        await userModel.validate(req.body);
      }

      const isMatch = compareString(password, userData.password);
      if (!isMatch) {
        errors.password_error = "Password is not correct, please try again";
      }

      if (Object.keys(errors).length > 0) {
        return res.render("auth-view/signin", { errors, formData: req.body });
      }

      req.session.username = userData.username;
      req.session.role = userData.role;
      return res.redirect("/");
    } catch (error) {
      if (error.name === "ValidationError") {
        for (let field in error.errors) {
          errors[field] = error.errors[field].message;
        }
      }
      return res.render("auth-view/signin", { errors });
    }
  },

  // handle signout
  signOut: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};

module.exports = authController;
