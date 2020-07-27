const express = require("express");
const router = express.Router();

const checkLogin = require("../Passport/checkLogin");

/* GET home page. */
router.get("/", checkLogin, (req, res, next) => {
  res.render("index", {
    title: "Home",
    pagename: "Home",
    user: req.user,
    student: 1,
  });
});

router.get("/profile", checkLogin, async (req, res, next) => {
  // const user = {
  //   fullName: req.user.getFullName(),
  //   className: await req.user.getClassName(),
  //   id: req.user.id,
  //   typeUser: req.user.typeUser,
  // };

  console.log(user);

  res.render("profile", {
    title: "Profile",
    style: ["styleProfile.css"],
    pagename: "Thông tin cá nhân",
    user: req.user,
  });
});

module.exports = router;
