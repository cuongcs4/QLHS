//Sơ đồ lớp của Class

const Class = class {
  constructor(classID, managerClass, roomID, course, status) {
    this.classID = classID || null;
    this.managerClass = managerClass || null;
    this.roomID = roomID || null;
    this.course = course || null;
    this.status = status || null;
  }

  getClassID() {
    return this.classID;
  }

  getManagerClass() {
    return this.managerClass;
  }
  setManagerClass(newManagerClass) {
    this.managerClass = newManagerClass;
  }

  getRoom() {}

  getCourse() {
    return this.course;
  }

  getStatus() {
    return this.status;
  }

  static find(classID) {}

  static save() {}
};

module.exports = Class;
