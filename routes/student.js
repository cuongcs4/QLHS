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

router.post("/submit", checkLogin, checkStudent, (req, res, next) => {});

module.exports = router;
