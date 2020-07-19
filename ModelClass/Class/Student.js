// Sơ đò lớp của Student kế thừa từ User.

const User = require("./User");

const Student = class extends User {
  constructor(
    id,
    username,
    password,
    identityCard,
    fullName,
    dob,
    address,
    status,
    classID
  ) {
    super(id, username, password, identityCard, fullName, dob, address, status);
    this.classID = classID || null;
  }

  getClassID() {
    return this.classID;
  }
  setClassID(newClassID) {
    this.classID = newClassID;
  }

  static Find() {}

  static Save() {}
};

module.exports = Student;
