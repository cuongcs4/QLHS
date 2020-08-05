const express = require("express");
const router = express.Router();

const checkLogin = require("../Passport/checkLogin");
const flagClass = require("../ModelClass/Helper/resource/Flag");
const indexController = require("../Controller/IndexController/register");

/* GET home page. */
router.get("/", checkLogin, (req, res, next) => {
  const typeUser = req.user.getTypeUser();

  switch (typeUser) {
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

router.get("/changePassword", checkLogin, (req, res, next) => {
  res.render("index", {
    title: "Đổi mật khẩu",
    pagename: "Đổi mật khẩu",
    user: req.user,
  });
});
router.post("/profile", checkLogin, indexController.postProfile);

router.get("/profile", checkLogin, async (req, res, next) => {
  const user = { ...req.user };

  switch (user.typeUser) {
    case flagClass.TYPE_USER.STUDENT:
      user.className = await req.user.getClassName();
      break;

    case flagClass.TYPE_USER.TEACHER:
      user.subjectName = await req.user.getSubjectName();
      break;

    case flagClass.TYPE_USER.HOMEROOM_TEACHER:
      user.subjectName = await req.user.getSubjectName();
      user.className = await req.user.getClassName();
      break;
  }

  // console.log(user);

  // const user = {
  //   fullName: req.user.getFullName(),
  //   className: await req.user.getClassName(),
  //   id: req.user.id,
  //   typeUser: req.user.typeUser,
  // };

  res.render("profile", {
    title: "Profile",
    style: ["styleProfile.css", "styleTable.css"],
    pagename: "Thông tin cá nhân",
    user,
  });
});

module.exports = router;
