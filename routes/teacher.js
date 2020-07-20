const express = require("express");
const router = express.Router();

router.get("/managerClass", (req, res, next) => {
  res.send("Quản lý lớp chủ nhiệm");
});

router.get("/class", (req, res, next) => {
  res.send("Quản lý lớp học");
});

router.get("/exam", (req, res, next) => {
  res.send("Lịch coi thi");
});

router.get("/schedule", (req, res, next) => {
  res.send("Lịch dạy");
});

router.get("/reExamine", (req, res, next) => {
  res.send("Phúc khảo");
});

module.exports = router;
