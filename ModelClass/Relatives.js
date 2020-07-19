//Sơ đồ lớp của Relatives

const Relatives = class {
  constructor(studentID, relative, fullName, phoneNumber) {
    this.studentID = studentID || null;
    this.relative = relative || null;
    this.fullName = fullName || null;
    this.phoneNumber = phoneNumber || null;
  }

  getStudent() {}

  getRelative() {}
  setRelative() {}

  getFullName() {}
  setFullName() {}

  getPhoneNumber() {}
  setPhoneNumber() {}

  static find() {}

  static save() {}
};

module.exports = Relatives;
