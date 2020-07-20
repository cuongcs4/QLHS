const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res, next) => {
  res.render("login", {
    title: "Login",
    layout: false,
  });
});

router.post("/", (req, res, next) => {
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", (req, res, next) => {
  req.logOut();
  req.flash("success_msg", "Đăng xuất thành công!");
  res.redirect("/login");
});

module.exports = router;
