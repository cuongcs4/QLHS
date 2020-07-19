// Sơ đò lớp của Admin kế thừa từ Employee.

const Employee = require("./Employee");

const Admin = class extends User {
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
    typeEmployee
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
  }

  getEmployee() {}

  disableEmployee() {}

  enableEmployee() {}

  createNewEmployee() {}

  createNewSemester() {}

  closeSemester() {}
};

module.exports = Admin;
