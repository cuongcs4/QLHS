const ReExamination = require("../../../Model/Class/ReExamination");
const Class = require("../../../Model/Class/Class");
const Semester = require("../../../Model/Class/Semester");

const handleSemester = require("../../../Model/Helper/services/handleSemester");

const getReExamination = async (req, res, next) => {
  let { year, semester } = req.query;

  const error_msg = [];

  let { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );

  let yearStart, yearEnd, semesterID;

  if (typeof year != "undefined") {
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
  } else {
    const latestSemester = await Semester.getLatestSemester();
    semesterID = latestSemester.getSemesterID();
    yearStart = latestSemester.getYearStart();
    yearEnd = latestSemester.getYearEnd();
  }

  const teacherID = req.user.getID();

  //Lấy các đơn phúc khảo
  const listReExamination = await ReExamination.Find(
    { studentID: null, teacherID: teacherID },
    semesterID,
    yearStart,
    yearEnd
  );

  //Tạo danh sách hiển thị
  const listReExaminationView = [];

  for (let i = 0; i < listReExamination.length; i++) {
    const {
      id,
      studentID,
      studentName,
      classID,
      content,
      response,
      status,
    } = listReExamination[i];

    const className = await Class.GetClassName(classID);

    listReExaminationView.push({
      id,
      studentID,
      studentName,
      classID,
      className,
      content,
      response,
      status,
      dataTarget: `Re${i}`,
      semesterID,
      yearStart,
      yearEnd,
      teacherID: req.user.getID(),
      subjectID: req.user.getSubjectID(),
    });
  }

  //

  res.render("teacher/reExamination", {
    title: "Phúc khảo",
    style: ["styleTable.css"],
    user: req.user,
    allYearSemester,
    isLastSemester,
    listReExaminationView,
    error_msg,
  });
};

module.exports = getReExamination;
