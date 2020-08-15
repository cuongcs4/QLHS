const flagClass = require("../Model/Helper/resource/Flag");

const checkAdmin = (req, res, next) => {
  if (req.user.typeUser !== flagClass.TYPE_USER.ADMIN) {
    req.flash("error_msg", "Bạn không phải là admin!");
    res.redirect("/");
  } else {
    return next();
  }
};

module.exports = checkAdmin;
