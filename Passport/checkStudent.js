const flagClass = require("../ModelClass/MiniServices/Flag");

const checkStudent = (req, res, next) => {
  if (req.user.typeUser !== flagClass.TYPE_USER.STUDENT) {
    res.redirect("/");
  } else {
    return next();
  }
};

module.exports = checkStudent;
