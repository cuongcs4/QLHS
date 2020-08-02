const Teacher = require("../../../ModelClass/Class/Teacher");
const EmployeeTrainingDepartment = require("../../../ModelClass/Class/EmployeeTrainingDepartment");
const Flag = require("../../../ModelClass/Helper/resource/Flag");
const Employee = require("../../../ModelClass/Class/Employee");

const postManagerStaff = async (req, res, next) => {
  const {
    username,
    fullName,
    dob,
    identityCard,
    address,
    gender,
    phoneNumber,
    subjectID,
    status,
  } = req.body;
  const teacher = await Teacher.Find(username);
  const employee = await EmployeeTrainingDepartment.Find(username);
  if (teacher !== null) {
    const updateTeacher = new Teacher(
      username,
      username,
      teacher.password,
      identityCard,
      fullName,
      dob,
      gender,
      address,
      status,
      null,
      phoneNumber,
      Flag.TYPE_USER.TEACHER,
      subjectID
    );
    await Teacher.Save(updateTeacher);
  }
  if (employee !== null) {
    const updateEmployee = new Employee(
      username,
      username,
      employee.password,
      identityCard,
      fullName,
      dob,
      gender,
      address,
      status,
      null,
      phoneNumber,
      Flag.TYPE_USER.EMPLOYEE_TRAINING_DEPARTMENT,
    );
    await EmployeeTrainingDepartment.Save(updateEmployee);
  }
  req.flash("success_msg", "Thành công.");
  res.redirect(`/admin/employee`);
};

module.exports = postManagerStaff;
