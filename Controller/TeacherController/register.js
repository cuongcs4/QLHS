const getScheduleExam = require("./services/getScheduleExam");
const getSchedule = require("./services/getSchedule");
const getClass = require("./services/getClass");
const getManagerClass = require("./services/getManagerClass");
const getManagerClassScore = require("./services/getManagerClassScore");
const postStudentInClass = require("./services/postStudentInClass");
const postStudentInClassExcel = require("./services/postStudentInClassExcel");
const postManagerClassScore = require("./services/postManagerClassScore");
const postManagerClassScoreExcel = require("./services/postManagerClassScoreExcel");
const getStudentInClass = require("./services/getStudentInClass");
const getReExamination = require("./services/getReExamination");
const postManagerClassScoreExportExcel = require("./services/postManagerClassScoreExportExcel");
const postStudentInClassExportExcel = require("./services/postStudentInClassExportExcel");

module.exports = {
  getScheduleExam,
  getSchedule,
  getClass,
  getManagerClass,
  getManagerClassScore,
  postStudentInClass,
  postStudentInClassExcel,
  postManagerClassScore,
  postManagerClassScoreExcel,
  getStudentInClass,
  getReExamination,
  postManagerClassScoreExportExcel,
  postStudentInClassExportExcel,
};
