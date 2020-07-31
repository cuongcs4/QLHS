const flagClass = require("../ModelClass/Helper/resource/Flag");

const checkTeacher = (req, res, next) => {
  if (
    req.user.typeUser === flagClass.TYPE_USER.TEACHER ||
    req.user.typeUser === flagClass.TYPE_USER.HOMEROOM_TEACHER
  ) {
    return next();
  } else {
    req.flash("error_msg", "Bạn không phải là giáo viên!");
    res.redirect("/");
  }
};

module.exports = checkTeacher;
