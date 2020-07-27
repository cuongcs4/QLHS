const flagClass = require("../ModelClass/MiniServices/Flag");

const checkStaff = (req, res, next) => {
  if (req.user.typeUser !== flagClass.TYPE_USER.EMPLOYEE_TRAINING_DEPARTMENT) {
    res.redirect("/");
  } else {
    return next();
  }
};

module.exports = checkStaff;
