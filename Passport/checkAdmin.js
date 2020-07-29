const flagClass = require("../ModelClass/MiniServices/Flag");

const checkAdmin = (req, res, next) => {
  if (req.user.typeUser !== flagClass.TYPE_USER.ADMIN) {
    req.flash("error_msg", "Bạn không phải là admin!");
    res.redirect("/");
  } else {
    return next();
  }
};

module.exports = checkAdmin;
