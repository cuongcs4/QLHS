var express = require("express");
var router = express.Router();

router.get("/employee", (req, res, next) => {
  res.send("Quản lý nhân viên");
});

router.get("/semester", (req, res, next) => {
  res.send("Quản lý học kỳ");
});

module.exports = router;
