const Teacher = require("../../../ModelClass/Class/Teacher");
const Employee = require("../../../ModelClass/Class/EmployeeTrainingDepartment");
const flag = require("../../../ModelClass/Helper/resource/Flag");

const postAddStaff = async (req, res, next) => {
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
  const checkTeacher = await Teacher.Find(username);
  const checkEmployee = await Employee.Find(username);
  if (checkEmployee === null && checkTeacher === null) {
    const typeUserInt = parseInt(typeUser, 10);
    const genderInt = parseInt(gender, 10);
    if (typeUserInt === flag.TYPE_USER.TEACHER) {
      const subjectID = req.body.subjectID;
      const newTeacher = new Teacher(
        username,
        username,
        password,
        identityCard,
        fullName,
        dob,
        genderInt,
        address,
        flag.STATUS_USER.ENABLE,
        typeUserInt,
        phoneNumber,
        subjectID
      );
      await Teacher.Save(newTeacher);
    }
    if (typeUserInt === flag.TYPE_USER.EMPLOYEE_TRAINING_DEPARTMENT) {
      const newEmployee = new Employee(
        username,
        username,
        password,
        identityCard,
        fullName,
        dob,
        genderInt,
        address,
        flag.STATUS_USER.ENABLE,
        typeUserInt,
        phoneNumber
      );
      await Employee.Save(newEmployee);
    }
    req.flash("success_msg", "Thành công.");
    res.redirect(`/admin/employee`);
  }
  req.flash("error", "Tên người dùng đã tồn tại");
  res.redirect(`/admin/employee`);
};

module.exports = postAddStaff;
