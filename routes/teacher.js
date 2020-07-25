const express = require("express");
const router = express.Router();

router.get("/managerClass", function (req, res, next) {
  res.render("teacher/managerClass", {
    title: "Lớp chủ nhiệm",
    style: ""
  });
});

router.get("/class", (req, res, next) => {
  res.send("Quản lý lớp học");
});

router.get("/exam", (req, res, next) => {
  res.render("teacher/exam", {
    title: "Lịch gác thi",
    style: ["styleTable.css"]
  });
});

router.get("/schedule", (req, res, next) => {
  res.render("teacher/schedule", {
    title: "Lịch dạy học",
    style: ["styleSchedule.css", "styleTable.css"]
  });
});

router.get("/reexamine", (req, res, next) => {
  res.render("teacher/reExamination", {
    title: "Phúc khảo",
    style: ["styleTable.css"]
  });
});

module.exports = router;
