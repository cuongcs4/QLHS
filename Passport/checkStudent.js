const flagClass = require("../Model/Helper/resource/Flag");

const checkStudent = (req, res, next) => {
  if (req.user.typeUser !== flagClass.TYPE_USER.STUDENT) {
    req.flash("error_msg", "Bạn không phải là học sinh!");
    res.redirect("/");
  } else {
    return next();
  }
};

module.exports = checkStudent;
