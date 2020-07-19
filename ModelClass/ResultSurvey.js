//Sơ đồ lớp của ResultSurvey

const Semester = require("./Semester");

const ResultSurvey = class {
  constructor(semester, studentID, teacherID, subjectID, questionID, answer) {
    this.semester = semester || null;
    this.studentID = studentID || null;
    this.teacherID = teacherID || null;
    this.subjectID = subjectID || null;
    this.questionID = questionID || null;
    this.answer = answer || null;
  }

  getSemester() {}

  getStudent() {}

  getTeacher() {}

  getSubject() {}

  getQuestionID() {}

  getAnswer() {}

  static find() {}

  static save() {}
};

module.exports = ResultSurvey;
