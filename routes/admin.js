var express = require("express");
var router = express.Router();

router.get("/employee", function (req, res, next) {
  res.render("admin/staffTable", {
    title: "Danh sách nhân viên",
    style: ["styleTable.css"],
  });
});
router.get("/semester", (req, res, next) => {
  res.send("Quản lý học kỳ");
});

module.exports = router;
