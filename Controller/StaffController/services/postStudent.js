const Student = require("../../../ModelClass/Class/Student");

const flagClass = require("../../../ModelClass/Helper/resource/Flag");

const postStudent = async (req, res, next) => {
  const { studentID, status, classID } = req.body;

  const student = await Student.Find({ id: studentID, classID: null });

  if (student === null) {
    req.flash("error_msg", `Không tồn tại học sinh mã "${studentID}"`);
    res.redirect(`/staff/student/${classID}`);
  } else {
    student.setStatus(status);
    await Student.Save(student);

    if (status == flagClass.STATUS.DISABLE) {
      req.flash("success_msg", `Đã khóa tài khoản mã "${studentID}"`);
    } else {
      req.flash("success_msg", `Đã mở khóa tài khoản mã "${studentID}"`);
    }
    res.redirect(`/staff/student/${classID}`);
  }
};

module.exports = postStudent;
