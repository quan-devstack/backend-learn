const authMiddleware = (req, res, next) => {
  const isLogin = false;
  if (!isLogin) {
    return res.redirect("/auth/login");
  }
  next();
};

module.exports = authMiddleware;
