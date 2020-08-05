//Sơ đồ lớp của QuestionSurvey

const ExecuteSQL = require("../Database/ExecuteSQL");

const QuestionSurvey = class {
  constructor(questionID, content) {
    this.questionID = questionID || null;
    this.content = content || null;
  }

  getQuestionID() {}

  getContent() {
    return this.content;
  }
  setContent(newContent) {
    this.content = newContent;
  }

  static async Find(idQuestion) {
    if (typeof idQuestion === "undefined") {
      const sqlQuery = `SELECT macauhoi AS idQuestion, noidung AS content FROM CAUHOIKS `;

      const result = await ExecuteSQL(sqlQuery);

      return result;
    } else {
      const sqlQuery = `SELECT macauhoi AS idQuestion, noidung AS content FROM CAUHOIKS WHERE macauhoi='${idQuestion}'`;

      const result = await ExecuteSQL(sqlQuery);

      return result.length === 0 ? null : result[0];
    }
  }

  static save() {}
};

module.exports = QuestionSurvey;
