const Semester = require("../../../ModelClass/Class/Semester");
const flagClass = require("../../../ModelClass/Helper/resource/Flag");

const postSemester = async (req, res, next) => {
  const latestSemester = await Semester.getLatestSemester();

  if (latestSemester.getStatus() === flagClass.STATUS.ENABLE) {
    await req.user.closeSemester();
  } else {
    //open
    await req.user.createNewSemester();
  }

  req.flash("success_msg", "Thành công.");
  res.redirect("/admin/semester");
};

module.exports = postSemester;
