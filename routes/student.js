var express = require("express");
var router = express.Router();

router.get("/examtable", function (req, res, next) {
  res.render("student/examTable", {
    title: "Lịch thi học kì",
    style: ["styleTable.css"],
  });
});

router.get("/resulttable", function (req, res, next) {
  res.render("student/resultTable", {
    title: "Kết quả học tập",
    style: ["styleTable.css"],
  });
});

router.get("/schedule", function (req, res, next) {
  res.render("student/schedule", {
    title: "Thời khoá biểu",
    style: ["styleSchedule.css"],
  });
});

router.post("/submit", function (req, res, next) {});

module.exports = router;
