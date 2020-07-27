const express = require("express");
const router = express.Router();
const checkLogin = require("../Passport/checkLogin");

router.get("/managerClass", checkLogin, (req, res, next) => {
  res.render("teacher/managerClass", {
    title: "Lớp chủ nhiệm",
    style: "",
    user: req.user,
  });
});

router.get("/class", (req, res, next) => {
  res.send("Quản lý lớp học");
});

router.get("/exam", (req, res, next) => {
  res.render("teacher/exam", {
    title: "Lịch gác thi",
    style: ["styleTable.css"],
    user: req.user,
  });
});

router.get("/schedule", (req, res, next) => {
  res.render("teacher/schedule", {
    title: "Lịch dạy học",
    style: ["styleSchedule.css", "styleTable.css"],
    user: req.user,
  });
});

router.get("/reexamine", (req, res, next) => {
  res.render("teacher/reExamination", {
    title: "Phúc khảo",
    style: ["styleTable.css"],
    user: req.user,
  });
});

module.exports = router;
