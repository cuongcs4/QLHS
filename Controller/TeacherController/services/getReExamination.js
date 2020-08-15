const ReExamination = require("../../../Model/Class/ReExamination");
const Class = require("../../../Model/Class/Class");
const Semester = require("../../../Model/Class/Semester");

const handleSemester = require("../../../Model/Helper/services/handleSemester");

const getReExamination = async (req, res, next) => {
  let { year, semester } = req.query;

  const { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );

  let yearStart, yearEnd, semesterID;

  if (typeof year != "undefined") {
    const yearArray = year.split("-");
    yearStart = parseInt(yearArray[0]);
    yearEnd = parseInt(yearArray[1]);
    semesterID = parseInt(semester);
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

  console.log("GET RE_EXAMINATION");

  console.log(listReExamination);

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
      dataTarget: `${id}`,
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
  });
};

module.exports = getReExamination;
