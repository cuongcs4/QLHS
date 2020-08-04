const getClass = require("./services/getClass");
const getStudent = require("./services/getStudent");
const getExam = require("./services/getExam");
const getRoomExam = require("./services/getRoomExam");
const getReport = require("./services/getReport");
const getSurvey = require("./services/getSurvey");
const postClass = require("./services/postClass");
const postStudent = require("./services/postStudent");
const postNewStudent = require("./services/postNewStudent");
const getSchedule = require("./services/getSchedule");
const postSchedule = require("./services/postSchedule");
const postExam = require("./services/postExam");
const postEditExam = require("./services/postEditExam");
const getStudentInExamRoom = require("./services/getStudentInExamRoom");
const postExamRoomCreate = require("./services/postExamRoomCreate");
const postStudentInClassExportExcel = require("./services/postStudentInClassExportExcel");

module.exports = {
  getClass,
  getStudent,
  getExam,
  getRoomExam,
  getReport,
  getSurvey,
  postClass,
  postStudent,
  postNewStudent,
  getSchedule,
  postSchedule,
  postExam,
  postEditExam,
  getStudentInExamRoom,
  postExamRoomCreate,
  postStudentInClassExportExcel,
};
