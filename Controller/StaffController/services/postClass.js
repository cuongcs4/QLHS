const bcrypt = require("bcrypt");

const HomeroomTeacher = require("../../../Model/Class/HomeroomTeacher");
const Teacher = require("../../../Model/Class/Teacher");
const Student = require("../../../Model/Class/Student");
const Relatives = require("../../../Model/Class/Relatives");
const Room = require("../../../Model/Class/Room");
const Class = require("../../../Model/Class/Class");

const parseForm = require("../../../Model/Helper/services/parseFormFormidable");
const parseFileExcel = require("../../../Model/Helper/services/parseFileExcel");

const formatFileExcel = require("../../../Model/Helper/resource/formatFileExcel");
const flagClass = require("../../../Model/Helper/resource/Flag");
const Semester = require("../../../Model/Class/Semester");
const TeachingPlan = require("../../../Model/Class/TeachingPlan");
const Subject = require("../../../Model/Class/Subject");
const Score = require("../../../Model/Class/Score");
const Conduct = require("../../../Model/Class/Conduct");

const postClass = async (req, res, next) => {
  const result = await parseForm(req);

  const { path, fields } = result;
  const { teacherID, course, roomID } = fields;
  const { err, data } = parseFileExcel(path, formatFileExcel.studentFormat);

  //Kiểm tra các thông tin mà người dùng gửi lên xem có chính xác hay không.
  //1. Kiểm tra mã giáo viên có đúng hay không
  const isExistTeacher = await Teacher.Find(teacherID);

  if (!isExistTeacher) {
    req.flash("error_msg", `Giáo viên "${teacherID}" không tồn tại.`);
    res.redirect("/staff/class");
    return;
  }

  //2. Kiểm tra xem giáo viên có chủ nhiệm lớp nào hay không.
  const isExistHomeRoomTeacher = await HomeroomTeacher.Find(teacherID);

  if (isExistHomeRoomTeacher) {
    req.flash(
      "error_msg",
      `Giáo viên "${teacherID}" đang quản lý lớp "${isExistHomeRoomTeacher.getClassID()}"`
    );
    res.redirect("/staff/class");
    return;
  }

  //3. Kiểm phòng học có hợp lệ hay không
  const roomIDString = `0${roomID}`;
  const idRoom = roomIDString.slice(
    roomIDString.length - 2,
    roomIDString.length
  );
  const isExistRoom = await Room.Find(idRoom);

  if (!isExistRoom) {
    req.flash("error_msg", `Phòng học mã "${roomID}" không tồn tại.`);
    res.redirect("/staff/class");
    return;
  }

  //4. Kểm tra file excel
  if (err.length !== 0) {
    req.flash("error_msg", err);
    res.redirect("/staff/class");
    return;
  }

  //5. Tiến hành tạo mới lớp học.
  //5.1 Tạo mã lớp học mới
  let newClassIDString = `0${await Class.GetNewClassID(course)}`;
  newClassIDString = `${newClassIDString.slice(
    newClassIDString.length - 2,
    newClassIDString.length
  )}`;
  const newClassID = `LH${course}${newClassIDString}`;

  //5.2 Tạo mới lớp học và lưu xuống cơ sở dữ liệu
  const newClass = new Class(
    newClassID,
    teacherID,
    idRoom,
    course,
    flagClass.STATUS.ENABLE
  );

  //console.log(newClassIDString);

  await Class.Save(newClass);

  const latestSemester = await Semester.getLatestSemester();

  if (latestSemester.getStatus() === flagClass.STATUS.ENABLE) {
    //Nếu học kỳ có mở thì tiến hành tạo thời khóa biểu cho lớp học.
    for (let i = 1; i <= 6; i++) {
      for (let j = 1; j <= 10; j++) {
        //Tạo học thời khóa biểu mới.
        const newTeachingPlan = new TeachingPlan(
          latestSemester,
          null,
          null,
          newClassID,
          i,
          j
        );

        //insert
        TeachingPlan.Insert(newTeachingPlan);
      }
    }
  }

  console.log(data);
  //6. Tiến hành tạo mới tài khoản và lưu thông tin học sinh.
  for (let i = 0; i < data.length; i++) {
    const {
      id,
      fullName,
      dob,
      identityCard,
      gender,
      address,
      dad,
      dadPhoneNumber,
      mom,
      momPhoneNumber,
    } = data[i];

    const password = bcrypt.hashSync(`${identityCard}`, 10);

    let newID = `0${i + 1}`;
    newID = newID.slice(newID.length - 2, newID.length);
    const studentID = `HS${course}${newClassIDString}${newID}`;
    const newStudent = new Student(
      studentID,
      studentID,
      password,
      identityCard,
      fullName,
      dob,
      gender,
      address,
      flagClass.STATUS.ENABLE,
      flagClass.TYPE_USER.STUDENT,
      newClassID
    );

    await Student.Save(newStudent);

    const newDad = new Relatives(studentID, "Ba", dad, dadPhoneNumber);
    Relatives.Save(newDad);
    const newMom = new Relatives(studentID, "Me", mom, momPhoneNumber);
    Relatives.Save(newMom);

    //Nếu học kỳ có mở thì tiến hành tạo điểm vào tạo hạnh kiểm
    if (latestSemester.getStatus() === flagClass.STATUS.ENABLE) {
      const listSubject = await Subject.Find();

      for (let j = 0; j < listSubject.length; j++) {
        const newScore = new Score(
          latestSemester,
          studentID,
          newClassID,
          listSubject[j].subjectID,
          0,
          0,
          0,
          0
        );

        //console.log(newScore);

        Score.Insert(newScore);
      }

      //insert conduct
      const newConduct = new Conduct(
        latestSemester,
        studentID,
        newClassID,
        teacherID,
        flagClass.CONDUCT.TYPE_1
      );
      //console.log(newConduct);

      Conduct.Insert(newConduct);
    }
  }

  req.flash("success_msg", "Thêm lớp học mới thành công.");
  res.redirect("/staff/class");
};

module.exports = postClass;

// const identityCard = 987654321;

// const password = bcrypt.hashSync(`${identityCard}`, 10);

// console.log(password);
