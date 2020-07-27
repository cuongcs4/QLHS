const express = require("express");
const router = express.Router();
const checkLogin = require("../Passport/checkLogin");

router.get("/class", checkLogin, (req, res, next) => {
  res.render("staff/classTable", {
    title: "Class Table",
    style: ["styleTable.css"],
    user: req.user,
  });
});

router.get("/student", checkLogin, (req, res, next) => {
  res.render("staff/studentTable", {
    title: "Danh sách học sinh",
    style: ["styleTable.css"],
    user: req.user,
  });
});

router.get("/exam", checkLogin, (req, res, next) => {
  res.render("staff/examTable", {
    title: "Lịch thi học kì",
    style: ["styleTable.css"],
    user: req.user,
  });
});

router.get("/room-exam", checkLogin, (req, res, next) => {
  res.render("staff/examRoom_studentListTable", {
    title: "Danh sách thí sinh",
    style: ["styleTable.css"],
    user: req.user,
  });
});

router.get("/report", checkLogin, (req, res, next) => {
  res.render("staff/report", {
    title: "Báo cáo",
    style: ["styleTable.css"],
    user: req.user,
  });
});

router.get("/survey", checkLogin, (req, res, next) => {
  res.render("staff/examRoomTable", {
    title: "Khảo sát",
    style: ["styleTable.css"],
    user: req.user,
  });
});

router.get("/examroom", checkLogin, (req, res, next) => {
  res.render("staff/examRoomTable", {
    title: "Danh sách phòng thi",
    style: ["styleTable.css"],
    user: req.user,
  });
});

module.exports = router;
