const Student = require("../../../ModelClass/Class/Student");
const Relatives = require("../../../ModelClass/Class/Relatives");

const flagClass = require("../../../ModelClass/Helper/resource/Flag");

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

  const newStudent = new Student(
    studentID,
    studentID,
    identityCard,
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