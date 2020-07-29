const flagClass = require("../ModelClass/MiniServices/Flag");

const checkStaff = (req, res, next) => {
  if (req.user.typeUser !== flagClass.TYPE_USER.EMPLOYEE_TRAINING_DEPARTMENT) {
    req.flash("error_msg", "Bạn không phải là giáo vụ!");
    res.redirect("/");
  } else {
    return next();
  }
};

module.exports = checkStaff;
