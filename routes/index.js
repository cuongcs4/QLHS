const express = require("express");
const router = express.Router();

const checkLogin = require("../Passport/checkLogin");
const flagClass = require("../ModelClass/MiniServices/Flag");

/* GET home page. */
router.get("/", checkLogin, (req, res, next) => {
  res.render("index", {
    title: "Home",
    pagename: "Home",
    user: req.user,
  });
});

router.get("/changePassword", checkLogin, (req, res, next) => {
  res.render("index", {
    title: "Đổi mật khẩu",
    pagename: "Đổi mật khẩu",
    user: req.user,
  });
});

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

  console.log(user);

  // const user = {
  //   fullName: req.user.getFullName(),
  //   className: await req.user.getClassName(),
  //   id: req.user.id,
  //   typeUser: req.user.typeUser,
  // };

  res.render("profile", {
    title: "Profile",
    style: ["styleProfile.css"],
    pagename: "Thông tin cá nhân",
    user,
  });
});

module.exports = router;
