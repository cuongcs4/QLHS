const Teacher = require("../../../Model/Class/Teacher");
const Student = require("../../../Model/Class/Student");
const Employee = require("../../../Model/Class/EmployeeTrainingDepartment");
const flag = require("../../../Model/Helper/resource/Flag");

const postProfile = async (req, res, next) => {
  //console.log(req.body);
  const { username, fullName, dob, identityCard, address, typeUser } = req.body;
  let user, newDate;
  newDate = new Date(dob);
  switch (parseInt(typeUser, 10)) {
    case 1:
      user = await Student.Find({ id: username, classID: null });
      await user.setFullName(fullName);
      await user.setDob(newDate);
      await user.setIdentityCard(identityCard);
      await user.setAddress(address);
      await Student.Save(user);
      break;
    case 2:
    case 3:
      user = await Teacher.Find(username);
      await user.setFullName(fullName);
      await user.setDob(newDate);
      await user.setIdentityCard(identityCard);
      await user.setAddress(address);
      await Teacher.Save(user);
      break;
    case 4:
    case 5:
      user = await Employee.Find(username);
      //console.log(user);
      await user.setFullName(fullName);
      await user.setDob(newDate);
      await user.setIdentityCard(identityCard);
      await user.setAddress(address);
      await Employee.Save(user);
      break;
  }

  req.flash("success_msg", "Thay đổi thông tin thành công");
  res.redirect(`/profile`);
};
module.exports = postProfile;
