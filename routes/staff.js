const express = require("express");
const router = express.Router();

const checkLogin = require("../Passport/checkLogin");
const checkStaff = require("../Passport/checkStaff");

const staffController = require("../Controller/StaffController/register");

//Router
router.get("/class", checkLogin, checkStaff, staffController.getClass);
router.post("/class", checkLogin, checkStaff, staffController.postClass);

router.get(
  "/student/:classID",
  checkLogin,
  checkStaff,
  staffController.getStudent
);

router.post("/student", checkLogin, checkStaff, staffController.postStudent);
router.post(
  "/new-student",
  checkLogin,
  checkStaff,
  staffController.postNewStudent
);

router.get(
  "/schedule/:classID",
  checkLogin,
  checkStaff,
  staffController.getSchedule
);
router.post("/schedule/", checkLogin, checkStaff, staffController.postSchedule);

router.get("/exam", checkLogin, checkStaff, staffController.getExam);
router.post("/exam", checkLogin, checkStaff, staffController.postExam);
router.post("/edit-exam", checkLogin, checkStaff, staffController.postEditExam);

router.get("/room-exam", checkLogin, checkStaff, staffController.getRoomExam);
router.get(
  "/room-exam/student",
  checkLogin,
  checkStaff,
  staffController.getStudentInExamRoom
);
router.post(
  "/room-exam/create",
  checkLogin,
  checkStaff,
  staffController.postExamRoomCreate
);
router.post(
  "/room-exam/export",
  checkLogin,
  checkStaff,
  staffController.postStudentInClassExportExcel
);

router.get("/report", checkLogin, checkStaff, staffController.getReport);
router.post("/report", checkLogin, checkStaff, staffController.postReport);

router.get("/survey", checkLogin, checkStaff, staffController.getSurvey);
router.post("/survey", checkLogin, checkStaff, staffController.postSurvey);
router.post(
  "/survey/export",
  checkLogin,
  checkStaff,
  staffController.postSurveyExport
);

module.exports = router;
