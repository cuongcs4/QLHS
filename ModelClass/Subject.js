//Sơ đồ lớp của Subject

const Subject = class {
  constructor(subjectID, subjectName, managerSubject) {
    this.subjectID = subjectID || null;
    this.subjectName = subjectName || null;
    this.managerSubject = managerSubject || null;
  }

  getSubjectID() {}

  getSubjectName() {}

  getManagerSubject() {}
  setManagerSubject() {}

  static find() {}

  static save() {}
};

module.exports = Subject;
