// Sơ đò lớp của HomeroomTeacher kế thừa từ Teacher.

const Teacher = require("./Teacher");
const Class = require("./Class");
const Student = require("./Student");

const HomeroomTeacher = class extends User {
  constructor(
    id,
    username,
    password,
    identityCard,
    fullName,
    dob,
    address,
    status,
    typeUser,
    phoneNumber,
    typeEmployee,
    subject,
    classID
  ) {
    super(
      id,
      username,
      password,
      identityCard,
      fullName,
      dob,
      address,
      status,
      typeUser,
      phoneNumber,
      typeEmployee,
      subject
    );
    this.classID = classID || null;
  }

  getClass() {
    return this.classID;
  }

  setClass(newClassID) {
    this.classID = newClassID;
  }

  async getStudent() {
    const studentInClass = await Student.Find({
      id: null,
      classID: this.classID,
    });

    return studentInClass;
  }

  getConduct(semesterID, yearStart, yearEnd) {}

  static find() {}

  static save() {}
};

module.exports = HomeroomTeacher;
