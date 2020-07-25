const express = require("express");
const router = express.Router();

router.get("/class", function (req, res, next) {
  res.render("staff/classTable", {
    title: "Class Table",
    style: ["styleTable.css"],
  });
});

router.get("/student", function (req, res, next) {
  res.render("staff/studentTable", {
    title: "Danh sách học sinh",
    style: ["styleTable.css"],
  });
});

router.get("/exam", function (req, res, next) {
  res.render("staff/examTable", {
    title: "Lịch thi học kì",
    style: ["styleTable.css"],
  });
});

router.get("/room-exam", function (req, res, next) {
  res.render("staff/examRoom_studentListTable", {
    title: "Danh sách thí sinh",
    style: ["styleTable.css"],
  });
});

router.get("/report", function (req, res, next) {
  res.render("staff/report", {
    title: "Báo cáo",
    style: ["styleTable.css"],
  });
});

router.get("/survey", function (req, res, next) {
  res.render("staff/examRoomTable", {
    title: "Khảo sát",
    style: ["styleTable.css"],
  });
});

router.get("/examroom", function (req, res, next) {
  res.render("staff/examRoomTable", {
    title: "Danh sách phòng thi",
    style: "styleTable.css",
  });
});

module.exports = router;
