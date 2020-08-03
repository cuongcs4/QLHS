const Teacher = require("../../../ModelClass/Class/Teacher");
const TeachingPlan = require("../../../ModelClass/Class/TeachingPlan");
const Semester = require("../../../ModelClass/Class/Semester");

const postSchedule = async (req, res, next) => {
  const {
    classID,
    dayInWeek,
    section,
    subjectID,
    teacherID,
    semesterID,
    year,
  } = req.body;

  console.log("SemesterID");
  console.log(semesterID);

  const yearString = year.split("-");
  const yearStart = parseInt(yearString[0]);
  const yearEnd = parseInt(yearString[1]);

  //1. check mã giáo viên
  const teacher = await Teacher.Find(teacherID);

  if (teacher === null) {
    req.flash("error_msg", `Không có giáo viên mã "${teacherID}".`);
    res.redirect(`/staff/schedule/${classID}`);
  }
  //2. check mã môn học
  if (subjectID !== teacher.getSubjectID()) {
    req.flash(
      "error_msg",
      `Giáo viên "${teacherID}" không dạy môn có mã "${subjectID}".`
    );
    req.flash(
      "error_msg",
      `Giáo viên "${teacherID}" dạy môn có mã "${teacher.getSubjectID()}".`
    );
    res.redirect(`/staff/schedule/${classID}`);
  } else {
    const semester = new Semester(semesterID, yearStart, yearEnd, null);

    console.log(semester);

    const dayInWeekNumber = parseInt(dayInWeek) - 1;

    const teachingPlan = new TeachingPlan(
      semester,
      teacherID,
      subjectID,
      classID,
      dayInWeekNumber,
      section
    );

    console.log(teachingPlan);

    await TeachingPlan.Save(teachingPlan);

    req.flash("success_msg", `Thành công.`);
    res.redirect(`/staff/schedule/${classID}`);
  }
};

module.exports = postSchedule;
