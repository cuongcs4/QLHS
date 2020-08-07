var express = require("express");
var router = express.Router();
const checkLogin = require("../Passport/checkLogin");
const checkStudent = require("../Passport/checkStudent");
const studentController = require("../Controller/StudentController/register");

router.get(
  "/examtable",
  checkLogin,
  checkStudent,
  studentController.getExamSchedule
);

router.get(
  "/resulttable",
  checkLogin,
  checkStudent,
  studentController.getResultTable
);

router.get(
  "/schedule",
  checkLogin,
  checkStudent,
  studentController.getSchedule
);

router.get("/survey", checkLogin, checkStudent, studentController.getSurvey);
router.post("/survey", checkLogin, checkStudent, studentController.postSurvey);

router.post(
  "/reExamination",
  checkLogin,
  checkStudent,
  studentController.postReExamination
);

router.post(
  "/reExamination/edit",
  checkLogin,
  checkStudent,
  studentController.postEditReExamination
);

router.get(
  "/reExamination",
  checkLogin,
  checkStudent,
  studentController.getReExamination
);

router.post("/submit", checkLogin, checkStudent, (req, res, next) => {});

module.exports = router;
