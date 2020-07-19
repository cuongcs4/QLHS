//Sơ đồ lớp của Class

const Class = class {
  constructor(classID, managerClass, course) {
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

module.exports = Class;
