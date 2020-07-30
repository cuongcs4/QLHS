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
  teacherController.getManagerClass
);

router.get(
  "/managerClass/score",
  checkLogin,
  checkHomeroomTeacher,
  teacherController.getManagerClassScore
);

router.get("/class", checkLogin, checkTeacher, teacherController.getClass);

router.post(
  "/class/:classID",
  checkLogin,
  checkTeacher,
  teacherController.postStudentInClass
);

router.get(
  "/class/:classID",
  checkLogin,
  checkTeacher,
  teacherController.getStudentInClass
);

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
