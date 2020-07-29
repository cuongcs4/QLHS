const flagClass = require("../ModelClass/MiniServices/Flag");

const checkHomeroomTeacher = (req, res, next) => {
  if (req.user.typeUser !== flagClass.TYPE_USER.HOMEROOM_TEACHER) {
    res.redirect("/");
  } else {
    return next();
  }
};

module.exports = checkHomeroomTeacher;
