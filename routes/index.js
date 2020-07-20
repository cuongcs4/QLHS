var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Home",
    pagename: "Home",
  });
});

router.get("/profile", function (req, res, next) {
  res.render("profile", {
    title: "Profile",
    style: "styleProfile.css",
    pagename: "Thông tin cá nhân",
  });
});

module.exports = router;
