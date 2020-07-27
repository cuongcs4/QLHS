const express = require("express");
const router = express.Router();
const checkLogin = require("../Passport/checkLogin");

router.get("/managerClass", checkLogin, (req, res, next) => {
  //console.log(req.user);

  // res.render("teacher/managerClass", {
  //   title: "Lớp chủ nhiệm",
  //   style: "",
  //   user: req.user,
  // });

  res.send("Hello mother fucker");
});

router.get("/class", checkLogin, (req, res, next) => {
  res.send("Quản lý lớp học");
});

router.get("/exam", checkLogin, (req, res, next) => {
  res.render("teacher/exam", {
    title: "Lịch gác thi",
    style: ["styleTable.css"],
    user: req.user,
  });
});

router.get("/schedule", checkLogin, (req, res, next) => {
  res.render("teacher/schedule", {
    title: "Lịch dạy học",
    style: ["styleSchedule.css", "styleTable.css"],
    user: req.user,
  });
});

router.get("/reexamine", checkLogin, (req, res, next) => {
  res.render("teacher/reExamination", {
    title: "Phúc khảo",
    style: ["styleTable.css"],
    user: req.user,
  });
});

module.exports = router;
