const flagClass = require("../ModelClass/Helper/resource/Flag");

const checkHomeroomTeacher = (req, res, next) => {
  if (req.user.typeUser !== flagClass.TYPE_USER.HOMEROOM_TEACHER) {
    req.flash("error_msg", "Bạn không phải là giáo viên chủ nhiệm!");
    res.redirect("/");
  } else {
    return next();
  }
};

module.exports = checkHomeroomTeacher;
