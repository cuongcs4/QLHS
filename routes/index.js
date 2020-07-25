const express = require("express");
const router = express.Router();

const checkLogin = require("../Passport/checkLogin");

/* GET home page. */
router.get("/", checkLogin, (req, res, next) => {
  res.render("index", {
    title: "Home",
    pagename: "Home",
  });
});

router.get("/profile", function (req, res, next) {
  res.render("profile", {
    title: "Profile",
    style: ["styleProfile.css"],
    pagename: "Thông tin cá nhân",
  });
});

module.exports = router;
