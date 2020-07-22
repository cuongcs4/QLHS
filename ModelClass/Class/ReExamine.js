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

  getStudentID() {
    return this.studentID;
  }

  getTeacherID() {
    return this.teacherID;
  }

  getSubjectID() {
    return this.subjectID;
  }

  getContent() {
    return this.content;
  }

  getResponse() {
    return this.response;
  }
  setResponse(newResponse) {
    this.response = newResponse;
  }

  getStatus() {
    return this.status;
  }
  setStatus(newStatus) {
    this.status = newStatus;
  }

  static find() {}

  static save() {}
};

module.exports = ReExamine;
