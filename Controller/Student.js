const handleSemester = require("../ModelClass/MiniServices/handleSemester");
const Class = require("../ModelClass/Class/Class");
const Room = require("../ModelClass/Class/Room");
const Student = require("../ModelClass/Class/Student");
const Subject = require("../ModelClass/Class/Subject");
const { response } = require("express");
const Semester = require("../ModelClass/Class/Semester");

const getSchedule = async (req, res, next) => {
  let { year, semester } = req.query;
  //Lấy tất cả các học kỳ đã có
  const { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );

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
    for (let k = 0; k < 5; k++) {
      for (let i = 0; i < schedule.length; i++) {
        if (schedule[i].startSection === j && schedule[i].dayInWeek === k + 2) {
          const subject = await Subject.Find(schedule[i].subjectID);
          sectionSchedule[k] = subject.subjectName;
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
    });
  }
  res.render("student/schedule", {
    title: "Thời khoá biểu",
    style: ["styleTable.css"],
    user: req.user,
    listScheduleView,
    allYearSemester,
    isLastSemester,
  });
};

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

const getResultTable = async (req, res, next) => {
  let { year, semester } = req.query;
  //Lấy tất cả các học kỳ đã có
  const { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );
  let listScores = [];
  if (typeof year == "undefined" && typeof semester == "undefined") {
    listScores = await req.user.getScore();
  } else {
    const yearArray = year.split("-");
    const yearStart = parseInt(yearArray[0]);
    const yearEnd = parseInt(yearArray[1]);
    const semesterID = parseInt(semester);

    listScores = await req.user.getScore(
      semesterID,
      yearStart,
      yearEnd
    );
  }
  const listScoreView = []
  for (let i = 0; i < listScores.length; i++) {
    const {subjectName, score1, score2, score3, score4 } = listScores[i];

    const score = {
      id: i + 1,
      subjectName,
      score1,
      score2,
      score3,
      score4
    };
    score.gpa =
      Math.round((10 * (score1 + score2 + 2 * score3 + 3 * score4)) / 7) / 10;
    listScoreView.push(score);
  }
  console.log(listScoreView);
  // render kết quảs
  res.render("student/resultTable", {
    title: "Kết quả học tập",
    style: ["styleTable.css"],
    user: req.user,
    listScoreView,
    allYearSemester,
    isLastSemester,
  });

};

module.exports = { getSchedule, getExamSchedule, getResultTable };
