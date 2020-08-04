const Teacher = require("../../../ModelClass/Class/Teacher");
const Student = require("../../../ModelClass/Class/Student");
const Employee = require("../../../ModelClass/Class/EmployeeTrainingDepartment");
const flag = require("../../../ModelClass/Helper/resource/Flag");

const postProfile = async (req, res, next) => {
    console.log(req.body);
    const {
        username,
        fullName,
        dob,
        identityCard,
        gender,
        address,
        typeUser,
        status
      } = req.body;
    const user = await Student.Find({id: username, classID:null});
        console.log(user);
        const updateStudent = new Student(
          username,
          username,
          user.password,
          identityCard,
          fullName,
          dob,
          gender,
          address,
          status,
          typeUser,
          user.classID
        );
        await Student.Save(updateStudent);
      //   break;
      // case 2,3:
      //   user = await Teacher.Find(username);
      //   break;
      // case 4,5:
      //   user = await Employee.Find(username);
      //   break

    req.flash("success_msg", "Thay đổi thông tin thành công");
    res.redirect(`/profile`);
};
module.exports = postProfile;
