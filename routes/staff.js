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

router.get("/exam", checkLogin, checkStaff, staffController.getExam);

router.get("/room-exam", checkLogin, checkStaff, staffController.getRoomExam);

router.get("/report", checkLogin, checkStaff, staffController.getReport);

router.get("/survey", checkLogin, checkStaff, staffController.getSurvey);

router.get("/examroom", checkLogin, checkStaff, (req, res, next) => {
  res.render("staff/examRoomTable", {
    title: "Danh sách phòng thi",
    style: ["styleTable.css"],
    user: req.user,
  });
});

module.exports = router;
