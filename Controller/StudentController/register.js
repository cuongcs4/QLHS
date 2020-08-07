const getSchedule = require("./services/getSchedule");
const getSurvey = require("./services/getSurvey");
const getExamSchedule = require("./services/getExamSchedule");
const getResultTable = require("./services/getResultTable");
const getReExamination = require("./services/getReExamination");
const postReExamination = require("./services/postReExamination");
const postSurvey = require("./services/postSurvey");
const postEditReExamination = require("./services/postEditReExamination");

module.exports = {
  getSchedule,
  getExamSchedule,
  getResultTable,
  getReExamination,
  postReExamination,
  postEditReExamination,
  getSurvey,
  postSurvey,
};
