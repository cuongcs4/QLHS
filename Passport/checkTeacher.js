const flagClass = require("../ModelClass/MiniServices/Flag");

const checkTeacher = (req, res, next) => {
  if (req.user.typeUser !== flagClass.TYPE_USER.TEACHER) {
    res.redirect("/");
  } else {
    return next();
  }
};

module.exports = checkTeacher;
