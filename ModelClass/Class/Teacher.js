// Sơ đò lớp của Teacher kế thừa từ Employee.

const Employee = require("./Employee");

const Teacher = class extends User {
  constructor(
    id,
    username,
    password,
    identityCard,
    fullName,
    dob,
    address,
    status,
    phoneNumber,
    typeEmployee,
    subjectID
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
      phoneNumber,
      typeEmployee
    );
    this.subjectID = subjectID || null;
  }

  getSubject() {}

  setSubject() {}

  getClass() {}

  getScore() {}

  getReExamine() {}

  getSchedule() {}

  getScheduleExam() {}

  static find() {}

  static save() {}
};

module.exports = Teacher;
