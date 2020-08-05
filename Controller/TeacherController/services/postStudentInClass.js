const Semester = require("../../../ModelClass/Class/Semester");
const Score = require("../../../ModelClass/Class/Score");

const postStudentInClass = async (req, res, next) => {
  const classID = req.params.classID;
  console.log("Hello");
  const { studentID, score1, score2, score3, score4 } = req.body;

  const latestSemester = await Semester.getLatestSemester();
  const { semesterID, yearStart, yearEnd } = latestSemester;

  const subjectID = req.user.getSubjectID();

  const score = new Score(
    latestSemester,
    studentID,
    classID,
    subjectID,
    score1,
    score2,
    score3,
    score4
  );

  await Score.Save(score);

  req.flash("success_msg", "Thành công.");
  res.redirect(
    `/teacher/class/${classID}?semester=${semesterID}&year=${yearStart}-${yearEnd}`
  );
};

module.exports = postStudentInClass;
