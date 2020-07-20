// Sơ đò lớp của Employee kế thừa từ User.

const User = require("./User");

const Employee = class extends User {
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
    super(id, username, password, identityCard, fullName, dob, address, status);
    this.phoneNumber = phoneNumber || null;
    this.typeEmployee = typeEmployee || null;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }
  setPhoneNumber(newPhoneNumber) {
    this.phoneNumber = newPhoneNumber;
  }

  getTypeEmployee() {
    return this.typeEmployee;
  }
  setTypeEmployee(newTypeEmployee) {
    this.typeEmployee = newTypeEmployee;
  }

  static Find() {}

  static Save() {}
};

module.exports = Employee;