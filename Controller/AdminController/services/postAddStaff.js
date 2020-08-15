const bcrypt = require("bcrypt");

const Teacher = require("../../../Model/Class/Teacher");
const Employee = require("../../../Model/Class/EmployeeTrainingDepartment");

const flag = require("../../../Model/Helper/resource/Flag");

const postAddStaff = async (req, res, next) => {
  //console.log(req.body);
  const {
    username,
    password,
    identityCard,
    fullName,
    dob,
    address,
    phoneNumber,
    gender,
    typeUser,
  } = req.body;

  const typeUserInt = parseInt(typeUser, 10);
  const genderInt = parseInt(gender, 10);
  const newDate = new Date(dob);

  const hashPassword = bcrypt.hash(password, 10);

  if (typeUserInt === flag.TYPE_USER.TEACHER) {
    const subjectID = req.body.subjectID;
    const newTeacher = new Teacher(
      username,
      username,
      hashPassword,
      identityCard,
      fullName,
      newDate,
      genderInt,
      address,
      flag.STATUS_USER.ENABLE,
      flag.TYPE_USER.TEACHER,
      phoneNumber,
      subjectID
    );
    await Teacher.Save(newTeacher);
  }
  if (typeUserInt === flag.TYPE_USER.EMPLOYEE_TRAINING_DEPARTMENT) {
    const newEmployee = new Employee(
      username,
      username,
      hashPassword,
      identityCard,
      fullName,
      newDate,
      genderInt,
      address,
      flag.STATUS_USER.ENABLE,
      flag.TYPE_USER.EMPLOYEE_TRAINING_DEPARTMENT,
      phoneNumber
    );
    await Employee.Save(newEmployee);
  }
  req.flash("success_msg", "Thành công.");
  res.redirect(`/admin/employee`);
};

module.exports = postAddStaff;
