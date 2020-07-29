const handleSemester = require("../ModelClass/MiniServices/handleSemester");
const Class = require("../ModelClass/Class/Class");
const getScheduleExam = async (req, res, next) => {
  let { year, semester } = req.query;

  //Lấy tất cả các học kỳ đã có
  const { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );

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

const getSchedule = async (req, res, next) => {
  let { year, semester } = req.query;

  //Lấy tất cả các học kỳ đã có
  const { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );

  let schedule;

  if (typeof year == "undefined" && typeof semester == "undefined") {
    schedule = await req.user.getSchedule();
  } else {
    const yearArray = year.split("-");
    const yearStart = parseInt(yearArray[0]);
    const yearEnd = parseInt(yearArray[1]);
    const semesterID = parseInt(semester);

    schedule = await req.user.getSchedule(semesterID, yearStart, yearEnd);
  }

  const scheduleView = [];

  for (let i = 1; i <= 10; i++) {
    const line = [];
    line.push(i);
    for (let j = 1; j <= 6; j++) {
      line.push("Trống");
    }
    scheduleView.push(line);
  }

  for (let i = 0; i < schedule.length; i++) {
    scheduleView[schedule[i].startSection - 1][
      schedule[i].dayInWeek
    ] = await Class.GetClassName(schedule[i].classID);
  }

  console.log(scheduleView);

  res.render("teacher/schedule", {
    title: "Lịch dạy",
    style: ["styleTable.css"],
    user: req.user,
    scheduleView,
    allYearSemester,
    isLastSemester,
  });
};

module.exports = { getScheduleExam, getSchedule };
