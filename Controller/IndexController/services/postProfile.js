const Teacher = require("../../../ModelClass/Class/Teacher");
const Student = require("../../../ModelClass/Class/Student");
const Employee = require("../../../ModelClass/Class/EmployeeTrainingDepartment");
const flag = require("../../../ModelClass/Helper/resource/Flag");

const postProfile = async (req, res, next) => {
  console.log(req.body);
  const { username, fullName, dob, identityCard, address, typeUser } = req.body;
  let user, dobArray, newDate;
  dobArray = dob.split('-')
  newDate = new Date(dobArray[2], dobArray[1]-1, dobArray[0]);
  switch (parseInt(typeUser,10)) {
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
      console.log(user);
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
