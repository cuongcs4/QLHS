const express = require("express");
const router = express.Router();

const checkLogin = require("../Passport/checkLogin");
const flagClass = require("../Model/Helper/resource/Flag");
const indexController = require("../Controller/IndexController/register");
const { check } = require("express-validator");

/* GET home page. */
router.get("/", checkLogin, (req, res, next) => {
  const typeUser = req.user.getTypeUser();

  switch (typeUser) {
    case flagClass.TYPE_USER.STUDENT:
      res.redirect("/student/schedule");
      break;
    case flagClass.TYPE_USER.TEACHER:
    case flagClass.TYPE_USER.HOMEROOM_TEACHER:
      res.redirect("/teacher/class");
      break;

    case flagClass.TYPE_USER.EMPLOYEE_TRAINING_DEPARTMENT:
      res.redirect("/staff/class");
      break;

    case flagClass.TYPE_USER.ADMIN:
      res.redirect("/admin/semester");
      break;

    default:
      res.render("index", {
        title: "Home",
        pagename: "Home",
        user: req.user,
      });
  }
});
router.post("/profile", checkLogin, indexController.postProfile);
router.get("/changePassword", checkLogin, (req, res, next) => {
  res.render("changePassword", {
    title: "Đổi mật khẩu",
    pagename: "Đổi mật khẩu",
    user: req.user,
    style: ["styleProfile.css"],
  });
});

router.post("/changePassword", checkLogin, indexController.postChangePassword);

router.get("/profile", checkLogin, indexController.getProfile);

module.exports = router;
