const Teacher = require("../../../ModelClass/Class/Teacher");
const Employee = require("../../../ModelClass/Class/EmployeeTrainingDepartment");
const getManagerStaff = async (req, res, next) => {
  const listTeacher = await Teacher.Find();
  const listEmployee = await Employee.Find();
  const listTeacherView = [];
  const listEmployeeView = []

  for (let i = 0; i < listTeacher.length; i++) {
    const { id, identityCard, fullName, dob, address, subjectID } = listTeacher[i];

    listTeacherView.push({
      id: i + 1,
      username: id,
      fullName,
      identityCard,
      dob: `${dob.getDate()}-${dob.getMonth() + 1}-${dob.getFullYear()}`,
      address,
      subjectID
    });
  }

  for (let i = 0; i < listEmployee.length; i++) {
    const { id, identityCard, fullName, dob, address} = listEmployee[i];

    listEmployeeView.push({
      id: i + 1,
      username: id,
      fullName,
      identityCard,
      dob: `${dob.getDate()}-${dob.getMonth() + 1}-${dob.getFullYear()}`,
      address
    });
  }

  res.render("admin/staffTable", {
    title: `Danh sách nhân viên`,
    style: ["styleTable.css", "styleProfile.css"],
    user: req.user,
    listTeacherView,
    listEmployeeView
  });
};
module.exports = getManagerStaff;
