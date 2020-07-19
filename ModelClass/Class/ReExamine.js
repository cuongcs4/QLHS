//Sơ đồ lớp của ReExamine

const Semester = require("./Semester");

const ReExamine = class {
  constructor(
    semester,
    studentID,
    teacherID,
    subjectID,
    content,
    response,
    status
  ) {
    this.semester = semester || null;
    this.studentID = studentID || null;
    this.teacherID = teacherID || null;
    this.subjectID = subjectID || null;
    this.content = content || null;
    this.response = response || null;
    this.status = status || null;
  }

  getSemester() {}

  getStudent() {}

  getTeacher() {}

  getSubject() {}

  getContent() {}

  getResponse() {}
  setResponse() {}

  getStatus() {}
  setStatus() {}

  static find() {}

  static save() {}
};

module.exports = ReExamine;
