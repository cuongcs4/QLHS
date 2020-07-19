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
    subject
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
    this.subject = subject || null;
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
