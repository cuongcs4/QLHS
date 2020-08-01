const express = require("express");
const router = express.Router();
const checkLogin = require("../Passport/checkLogin");
const checkTeacher = require("../Passport/checkTeacher");
const checkHomeroomTeacher = require("../Passport/checkHomeroomTeacher");

const teacherController = require("../Controller/TeacherController/register");

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

router.post(
  "/managerClass/score",
  checkLogin,
  checkHomeroomTeacher,
  teacherController.postManagerClassScore
);

router.post(
  "/managerClass/score/excel",
  checkLogin,
  checkHomeroomTeacher,
  teacherController.postManagerClassScoreExcel
);

router.post(
  "/managerClass/score/export-excel",
  checkLogin,
  checkHomeroomTeacher,
  teacherController.postManagerClassScoreExportExcel
);

router.get("/class", checkLogin, checkTeacher, teacherController.getClass);

router.post(
  "/class/:classID",
  checkLogin,
  checkTeacher,
  teacherController.postStudentInClass
);

router.post(
  "/class/excel/:classID",
  checkLogin,
  checkTeacher,
  teacherController.postStudentInClassExcel
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

router.get(
  "/reexamine",
  checkLogin,
  checkTeacher,
  teacherController.getReExamination
);

module.exports = router;
