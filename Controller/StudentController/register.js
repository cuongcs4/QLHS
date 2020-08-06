const getSchedule = require("./services/getSchedule");
const getExamSchedule = require("./services/getExamSchedule");
const getResultTable = require("./services/getResultTable");
const getReExamination = require("./services/getReExamination");
const postReExamination = require("./services/postReExamination");

module.exports = { getSchedule, getExamSchedule, getResultTable, getReExamination, postReExamination };
