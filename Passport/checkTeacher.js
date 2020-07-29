const flagClass = require("../ModelClass/MiniServices/Flag");

const checkTeacher = (req, res, next) => {
  if (
    req.user.typeUser === flagClass.TYPE_USER.TEACHER ||
    req.user.typeUser === flagClass.TYPE_USER.HOMEROOM_TEACHER
  ) {
    return next();
  } else {
    res.redirect("/");
  }
};

module.exports = checkTeacher;
