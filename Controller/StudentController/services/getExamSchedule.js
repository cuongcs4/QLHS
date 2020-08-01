const handleSemester = require("../../../ModelClass/Helper/services/handleSemester");
const Subject = require("../../../ModelClass/Class/Subject");
const getExamSchedule = async (req, res, next) => {
  let { year, semester } = req.query;
  //Lấy tất cả các học kỳ đã có
  const { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );
  let scheduleExam;
  if (typeof year == "undefined" && typeof semester == "undefined") {
    scheduleExam = await req.user.getExamSchedule();
  } else {
    const yearArray = year.split("-");
    const yearStart = parseInt(yearArray[0]);
    const yearEnd = parseInt(yearArray[1]);
    const semesterID = parseInt(semester);

    scheduleExam = await req.user.getExamSchedule(
      semesterID,
      yearStart,
      yearEnd
    );
  }
  //Gán lại cách hiển thị ngày coi thi
  for (let i = 0; i < scheduleExam.length; i++) {
    const dayExam = scheduleExam[i].dayExam;
    scheduleExam[i].dayExam = `${dayExam.getDate()}/${
      dayExam.getMonth() + 1
    }/${dayExam.getFullYear()}`;
  }

  // render kết quảs
  res.render("student/examTable", {
    title: "Thời khoá biểu",
    style: ["styleTable.css"],
    user: req.user,
    scheduleExam,
    allYearSemester,
    isLastSemester,
  });
};

module.exports = getExamSchedule;
