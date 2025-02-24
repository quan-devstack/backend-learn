const checkAdminRole = (req, res, next) => {
  if (req.session.username && req.session.role == "Admin") {
    next();
  } else {
    res.redirect("/signin");
  }
};

module.exports = checkAdminRole;
