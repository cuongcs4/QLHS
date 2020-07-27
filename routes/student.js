var express = require("express");
var router = express.Router();
const checkLogin = require("../Passport/checkLogin");

router.get("/examtable", checkLogin, (req, res, next) => {
  res.render("student/examTable", {
    title: "Lịch thi học kì",
    style: ["styleTable.css"],
    user: req.user,
  });
});

router.get("/resulttable", checkLogin, (req, res, next) => {
  res.render("student/resultTable", {
    title: "Kết quả học tập",
    style: ["styleTable.css"],
    user: req.user,
  });
});

router.get("/schedule", checkLogin, (req, res, next) => {
  res.render("student/schedule", {
    title: "Thời khoá biểu",
    style: ["styleSchedule.css"],
    user: req.user,
  });
});

router.post("/submit", checkLogin, (req, res, next) => {});

module.exports = router;
