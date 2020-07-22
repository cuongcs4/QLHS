// Sơ đò lớp của HomeroomTeacher kế thừa từ Teacher.

const Teacher = require("./Teacher");

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

  getClass() {}

  setClass() {}

  getStudent() {}

  getConduct() {}

  static find() {}

  static save() {}
};

module.exports = HomeroomTeacher;
