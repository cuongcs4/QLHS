const bcrypt = require("bcrypt");

const Student = require("../../../Model/Class/Student");
const Relatives = require("../../../Model/Class/Relatives");

const flagClass = require("../../../Model/Helper/resource/Flag");
const Semester = require("../../../Model/Class/Semester");
const Class = require("../../../Model/Class/Class");
const Conduct = require("../../../Model/Class/Conduct");
const Score = require("../../../Model/Class/Score");

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

  const password = bcrypt.hashSync(`${identityCard}`, 10);

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

  console.log(newStudent);

  await Student.Save(newStudent);

  const dad = new Relatives(studentID, "Ba", dadFullName, dadPhoneNumber);
  const mom = new Relatives(studentID, "Me", momFullName, momPhoneNumber);

  await Relatives.Save(dad);
  await Relatives.Save(mom);

  const latestSemester = await Semester.getLatestSemester();

  //Nếu học kỳ có mở thì tiến hành tạo điểm vào tạo hạnh kiểm
  if (latestSemester.getStatus() === flagClass.STATUS.ENABLE) {
    const listSubject = await Subject.Find();

    for (let j = 0; j <= listSubject.length; j++) {
      const newScore = new Score(
        latestSemester,
        studentID,
        classID,
        listSubject[j].subjectID,
        0,
        0,
        0,
        0
      );
      Score.Insert(newScore);
    }

    //insert conduct
    const teacherID = (await Class.Find(classID)).getManagerClass();

    const newConduct = new Conduct(
      latestSemester,
      studentID,
      classID,
      teacherID,
      flagClass.CONDUCT.TYPE_1
    );

    Conduct.Insert(newConduct);
  }
  req.flash(
    "success_msg",
    `Thêm học sinh thành công, mã học sinh mới "${studentID}".`
  );

  res.redirect(`/staff/student/${classID}`);
};

module.exports = postNewStudent;
