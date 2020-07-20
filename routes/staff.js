const express = require("express");
const router = express.Router();

router.get("/class", function (req, res, next) {
  res.render("staff/classTable", {
    title: "Class Table",
    style: "styleTable.css",
    pagename: "Danh sách lớp học",
  });
});

router.get("/student", function (req, res, next) {
  res.render("staff/studentTable", {
    title: "Student Table",
    style: "styleTable.css",
    pagename: "Danh sách học sinh",
  });
});

router.get("/exam", function (req, res, next) {
  res.render("staff/examTable", {
    title: "Exam Table",
    style: "styleTable.css",
    pagename: "Lịch thi học kì",
  });
});

router.get("/room-exam", function (req, res, next) {
  res.render("staff/examRoom_studentListTable", {
    title: "Student List",
    style: "styleTable.css",
    pagename: "Danh sách phòng thi",
  });
});

router.get("/report", function (req, res, next) {
  res.render("staff/examRoomTable", {
    title: "Exam Room Table",
    style: "styleTable.css",
    pagename: "Báo cáo",
  });
});

router.get("/survey", function (req, res, next) {
  res.render("staff/examRoomTable", {
    title: "Exam Room Table",
    style: "styleTable.css",
    pagename: "Khảo sát",
  });
});

router.get("/examroom", function (req, res, next) {
  res.render("staff/examRoomTable", {
    title: "Exam Room Table",
    style: "styleTable.css",
    pagename: "Lịch thi học kì",
  });
});

module.exports = router;
