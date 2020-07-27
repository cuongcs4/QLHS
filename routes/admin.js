const express = require("express");
const router = express.Router();
const checkLogin = require("../Passport/checkLogin");
const checkAdmin = require("../Passport/checkAdmin");

router.get("/employee", checkLogin, checkAdmin, (req, res, next) => {
  res.render("admin/staffTable", {
    title: "Danh sách nhân viên",
    style: ["styleTable.css"],
    user: req.user,
  });
});
router.get("/semester", checkLogin, checkAdmin, (req, res, next) => {
  res.send("Quản lý học kỳ");
});

module.exports = router;
