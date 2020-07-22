//Sơ đồ lớp của QuestionSurvey

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

  static find() {}

  static save() {}
};

module.exports = QuestionSurvey;
