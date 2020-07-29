const checkLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error_msg", "Bạn chưa đăng nhập, vui lòng đăng nhập!");
    res.redirect("/login");
  }
};

module.exports = checkLogin;
