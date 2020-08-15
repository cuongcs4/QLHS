const handleSemester = require("../../../Model/Helper/services/handleSemester");
const Subject = require("../../../Model/Class/Subject");
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

  const listScheduleView = [];

  for (let j = 1; j <= 10; j++) {
    const sectionSchedule = [];

    for (let k = 1; k <= 6; k++) {
      for (let i = 0; i < schedule.length; i++) {
        if (schedule[i].startSection === j && schedule[i].dayInWeek === k) {
          const subject = await Subject.Find(schedule[i].subjectID);
          if (subject !== null) sectionSchedule[k - 1] = subject.subjectName;
        }
      }
    }

    listScheduleView.push({
      id: j,
      subject1: sectionSchedule[0],
      subject2: sectionSchedule[1],
      subject3: sectionSchedule[2],
      subject4: sectionSchedule[3],
      subject5: sectionSchedule[4],
      subject6: sectionSchedule[5],
    });
  }

  console.log(listScheduleView);

  res.render("student/schedule", {
    title: "Thời khoá biểu",
    style: ["styleTable.css"],
    user: req.user,
    listScheduleView,
    allYearSemester,
    isLastSemester,
  });
};

module.exports = getSchedule;
