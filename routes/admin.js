const express = require("express");
const router = express.Router();
const checkLogin = require("../Passport/checkLogin");

router.get("/employee", checkLogin, (req, res, next) => {
  res.render("admin/staffTable", {
    title: "Danh sách nhân viên",
    style: ["styleTable.css"],
    user: req.user,
  });
});
router.get("/semester", checkLogin, (req, res, next) => {
  res.send("Quản lý học kỳ");
});

module.exports = router;
