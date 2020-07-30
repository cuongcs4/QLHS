const handleSemester = require("../ModelClass/MiniServices/handleSemester");
const Class = require("../ModelClass/Class/Class");
const Room = require("../ModelClass/Class/Room");
const Student = require("../ModelClass/Class/Student");
const Subject = require("../ModelClass/Class/Subject");
const { response } = require("express");

const getSchedule = async (req, res, next) => {
  const student = await Student.Find({ id: "HS20180101", class: null });
  console.log(student);
  const schedule = await student.getSchedule();
  const listScheduleView = [];

  for (let j = 0; j < 10; j++) {
    const sectionSchedule = [];
    for (let k = 2; k <= 6; k++) {
      for (let i = 0; i < schedule.length; i++) {
        if (schedule[i].startSection === j + 1 && schedule[i].dayInWeek === k) {
          const subject = await Subject.Find(schedule[i].subjectID);
          console.log(subject);
          sectionSchedule.push(subject.subjectName);
        }
      }
    }
    listScheduleView.push({
        id: j+1,
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
  });
};
module.exports = { getSchedule };
