//Sơ đồ lớp của QuestionSurvey

const QuestionSurvey = class {
  constructor(questionID, content) {
    this.questionID = questionID || null;
    this.content = content || null;
  }

  getQuestionID() {}

  getContent() {}
  setContent() {}

  static find() {}

  static save() {}
};

module.exports = QuestionSurvey;
