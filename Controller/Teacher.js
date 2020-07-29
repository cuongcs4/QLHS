const Semester = require("../ModelClass/Class/Semester");

const getScheduleExam = async (req, res, next) => {
  let { year, semester } = req.query;

  //Lấy tất cả các học kỳ đã có
  let allYearSemester = await Semester.Find();

  //Sắp xếp học kỳ
  allYearSemester.sort((a, b) => {
    if (a.yearStart < b.yearStart) {
      return 1;
    }

    if (a.yearStart > b.yearStart) {
      return -1;
    }

    // a == b
    if (a.semesterID < b.semesterID) {
      return 1;
    }

    if (a.semesterID > b.semesterID) {
      return -1;
    }
    return 0;
  });

  let isLastSemester = allYearSemester[0].semesterID === 2 ? true : false;
  allYearSemester = allYearSemester.map((year) => {
    if (year.semesterID === 2) return;
    return `${year.yearStart}-${year.yearEnd}`;
  });

  let scheduleExam;

  if (typeof year == "undefined" && typeof semester == "undefined") {
    scheduleExam = await req.user.getScheduleExam();
  } else {
    const yearArray = year.split("-");
    const yearStart = parseInt(yearArray[0]);
    const yearEnd = parseInt(yearArray[1]);
    const semesterID = parseInt(semester);

    scheduleExam = await req.user.getScheduleExam(
      semesterID,
      yearStart,
      yearEnd
    );

    isLastSemester = semesterID === 2 ? true : false;

    for (let i = 0; i < allYearSemester.length; i++) {
      if (year === allYearSemester[i]) {
        allYearSemester[i] = allYearSemester[0];
        allYearSemester[0] = year;
        break;
      }
    }
  }

  const date = [];

  scheduleExam.sort((a, b) => {
    if (a.dayExam < b.dayExam) {
      return -1;
    }

    if (a.dayExam > b.dayExam) {
      return 1;
    }

    // a == b
    return 0;
  });

  for (let i = 0; i < scheduleExam.length; i++) {
    const dayExam = scheduleExam[i].dayExam;
    scheduleExam[i].dayExam = `${dayExam.getDate()}/${
      dayExam.getMonth() + 1
    }/${dayExam.getFullYear()}`;

    date.push(dayExam);
  }

  res.render("teacher/exam", {
    title: "Lịch gác thi",
    style: ["styleTable.css"],
    user: req.user,
    scheduleExam,
    allYearSemester,
    isLastSemester,
  });
};

module.exports = { getScheduleExam };
