const express = require("express");
const router = express.Router();
const checkLogin = require("../Passport/checkLogin");
const checkTeacher = require("../Passport/checkTeacher");
const checkHomeroomTeacher = require("../Passport/checkHomeroomTeacher");

const teacherController = require("../Controller/Teacher");

router.get(
  "/managerClass",
  checkLogin,
  checkHomeroomTeacher,
  (req, res, next) => {
    //console.log(req.user);

    // res.render("teacher/managerClass", {
    //   title: "Lớp chủ nhiệm",
    //   style: "",
    //   user: req.user,
    // });

    res.send("Hello mother fucker");
  }
);

router.get("/class", checkLogin, checkTeacher, (req, res, next) => {
  res.send("Quản lý lớp học");
});

router.get(
  "/exam",
  checkLogin,
  checkTeacher,
  teacherController.getScheduleExam
);

router.get(
  "/schedule",
  checkLogin,
  checkTeacher,
  teacherController.getSchedule
);

router.get("/reexamine", checkLogin, checkTeacher, (req, res, next) => {
  res.render("teacher/reExamination", {
    title: "Phúc khảo",
    style: ["styleTable.css"],
    user: req.user,
  });
});

module.exports = router;
