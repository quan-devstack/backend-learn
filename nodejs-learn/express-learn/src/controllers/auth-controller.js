const { object, string } = require("yup");
const getError = require("../utils/validate");

const authController = {
  signIn: (req, res) => {
    const errs = req.flash("errs");
    res.render("auth/login", { layout: "auth/layout", errs, getError });
  },

  handleSignin: async (req, res) => {
    // const { email, password } = req.body;
    const schema = object({
      email: string().required("Email is reuqired").email(),
      password: string().required("Password is required").min(6),
    });

    try {
      const data = await schema.validate(req.body, {
        abortEarly: false,
      });
    } catch (error) {
      let errs = error.inner.map(({ path, message }) => [path, message]);
      errs = Object.fromEntries(errs);
      req.flash("errs", errs);
    }
    return res.redirect("/auth/login");
  },
};

module.exports = authController;
