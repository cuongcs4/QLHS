// Sơ đò lớp của EmployeeTrainingDepartment kế thừa từ Employee.

const Employee = require("./Employee");

const EmployeeTrainingDepartment = class extends User {
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

  getClass() {}

  getStudents() {}

  getStudent() {}

  createNewStudent() {}

  createNewClass() {}

  getSchedule() {}

  getScheduleExam() {}

  getExamRoom() {}

  getStudentExamRoom() {}

  createExamRoom() {}

  getScore() {}

  getConduct() {}

  getResultSurvey() {}

  openSurvey() {}

  editQuestionSurvey() {}
};

module.exports = EmployeeTrainingDepartment;
