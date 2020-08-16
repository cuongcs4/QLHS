const ReExamine = require("../../../Model/Class/ReExamination");
const Subject = require("../../../Model/Class/Subject");
const Semester = require("../../../Model/Class/Semester");
const handleSemester = require("../../../Model/Helper/services/handleSemester");

const getReExamination = async (req, res, next) => {
  let { year, semester } = req.query;
  const error_msg = [];

  //Lấy tất cả các học kỳ đã có
  let { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );
  let yearStart, yearEnd, semesterID;
  if (typeof year == "undefined") {
    const latestSemester = await Semester.getLatestSemester();
    semesterID = latestSemester.getSemesterID();
    yearStart = latestSemester.getYearStart();
    yearEnd = latestSemester.getYearEnd();
  } else {
    const yearArray = year.split("-");
    yearStart = parseInt(yearArray[0]);
    yearEnd = parseInt(yearArray[1]);
    semesterID = parseInt(semester);

    const isExistSemester = await Semester.Find(semesterID, yearStart, yearEnd);
    if (!isExistSemester) {
      error_msg.push(
        `Học kỳ ${semesterID} năm học ${yearStart}-${yearEnd} chưa có dữ liệu.`
      );

      const latestSemester = await Semester.getLatestSemester();
      semesterID = latestSemester.getSemesterID();
      yearStart = latestSemester.getYearStart();
      yearEnd = latestSemester.getYearEnd();

      isLastSemester = false;
    }
  }

  const studentID = req.user.getID();
  const listReExamination = await ReExamine.Find(
    { studentID: studentID, teacherID: null, ID: null },
    semesterID,
    yearStart,
    yearEnd
  );

  const listReExaminationView = [];
  if (listReExamination !== null) {
    for (let i = 0; i < listReExamination.length; i++) {
      const {
        id,
        subjectID,
        subjectName,
        teacherID,
        content,
        response,
      } = listReExamination[i];

      listReExaminationView.push({
        id,
        subjectID,
        subjectName,
        teacherID,
        content,
        response,
        dataTarget: `${i}`,
      });
    }
  }
  const listSubject = await Subject.Find();
  const listSubjectView = [];
  if (listSubject !== null) {
    for (let i = 0; i < listSubject.length; i++) {
      const { subjectID, subjectName } = listSubject[i];
      listSubjectView.push({
        subjectID,
        subjectName,
      });
    }
  }

  res.render("student/reExamination", {
    title: "Phúc khảo",
    style: ["styleTable.css"],
    user: req.user,
    allYearSemester,
    isLastSemester,
    listReExaminationView,
    listSubjectView,
    error_msg,
  });
};

module.exports = getReExamination;
