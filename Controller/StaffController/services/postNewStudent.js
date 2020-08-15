const bcrypt = require("bcrypt");

const Student = require("../../../Model/Class/Student");
const Relatives = require("../../../Model/Class/Relatives");

const flagClass = require("../../../Model/Helper/resource/Flag");

const postNewStudent = async (req, res, next) => {
  const {
    fullName,
    dob,
    gender,
    identityCard,
    address,
    dadFullName,
    dadPhoneNumber,
    momFullName,
    momPhoneNumber,
    classID,
  } = req.body;

  const studentID = await Student.GetNewStudentID(classID);
  const newDoB = new Date(dob);

  const password = bcrypt.hash(identityCard, 10);

  const newStudent = new Student(
    studentID,
    studentID,
    password,
    identityCard,
    fullName,
    newDoB,
    gender,
    address,
    flagClass.STATUS.ENABLE,
    flagClass.TYPE_USER.STUDENT,
    classID
  );

  await Student.Save(newStudent);

  const dad = new Relatives(studentID, "Ba", dadFullName, dadPhoneNumber);
  const mom = new Relatives(studentID, "Me", momFullName, momPhoneNumber);

  await Relatives.Save(dad);
  await Relatives.Save(mom);

  req.flash(
    "success_msg",
    `Thêm học sinh thành công, mã học sinh mới "${studentID}".`
  );

  res.redirect(`/staff/student/${classID}`);
};

module.exports = postNewStudent;
