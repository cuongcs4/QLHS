var express = require("express");
var router = express.Router();
const checkLogin = require("../Passport/checkLogin");
const checkStudent = require("../Passport/checkStudent");

router.get("/examtable", checkLogin, checkStudent, (req, res, next) => {
  res.render("student/examTable", {
    title: "Lịch thi học kì",
    style: ["styleTable.css"],
    user: req.user,
  });
});

router.get("/resulttable", checkLogin, checkStudent, (req, res, next) => {
  res.render("student/resultTable", {
    title: "Kết quả học tập",
    style: ["styleTable.css"],
    user: req.user,
  });
});

router.get("/schedule", checkLogin, checkStudent, (req, res, next) => {
  res.render("student/schedule", {
    title: "Thời khoá biểu",
    style: ["styleTable.css"],
    user: req.user,
  });
});

router.post("/submit", checkLogin, checkStudent, (req, res, next) => {});

module.exports = router;
