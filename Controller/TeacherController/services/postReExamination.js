const ReExamination = require("../../../ModelClass/Class/ReExamination");
const Semester = require("../../../ModelClass/Class/Semester");

const postReExamination = async (req, res, next) => {
  const {
    id,
    studentID,
    classID,
    content,
    response,
    status,
    semesterID,
    yearStart,
    yearEnd,
    teacherID,
    subjectID,
  } = req.body;

  const semester = await Semester.Find(semesterID, yearStart, yearEnd);

  const reExamination = new ReExamination(
    id,
    semester,
    studentID,
    teacherID,
    subjectID,
    content,
    response,
    status
  );

  reExamination.setStatus(1);

  ReExamination.Save(reExamination);

  req.flash("success_msg", "Đã gửi phản hồi!");

  res.redirect(
    `/teacher/reExamine?semester=${semesterID}&year=${yearStart}-${yearEnd}`
  );
};

module.exports = postReExamination;
