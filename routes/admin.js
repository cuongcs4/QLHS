const express = require("express");
const router = express.Router();
const checkLogin = require("../Passport/checkLogin");
const checkAdmin = require("../Passport/checkAdmin");
const adminController = require("../Controller/AdminController/register");

router.get(
  "/employee",
  checkLogin,
  checkAdmin,
  adminController.getManagerStaff
);
router.post(
  "/employee",
  checkLogin,
  checkAdmin,
  adminController.postManagerStaff
);
router.post(
  "/employee/add",
  checkLogin,
  checkAdmin,
  adminController.postAddStaff
);

router.get("/semester", checkLogin, checkAdmin, adminController.getSemester);
router.post("/semester", checkLogin, checkAdmin, adminController.postSemester);

module.exports = router;
