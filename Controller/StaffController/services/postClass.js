const HomeroomTeacher = require("../../../ModelClass/Class/HomeroomTeacher");
const Teacher = require("../../../ModelClass/Class/Teacher");
const Student = require("../../../ModelClass/Class/Student");
const Relatives = require("../../../ModelClass/Class/Relatives");
const Room = require("../../../ModelClass/Class/Room");

const parseForm = require("../../../ModelClass/Helper/services/parseFormFormidable");
const parseFileExcel = require("../../../ModelClass/Helper/services/parseFileExcel");

const formatFileExcel = require("../../../ModelClass/Helper/resource/formatFileExcel");
const { format } = require("morgan");
const Class = require("../../../ModelClass/Class/Class");
const flagClass = require("../../../ModelClass/Helper/resource/Flag");

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

  console.log(newClassIDString);

  await Class.Save(newClass);

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

    let newID = `0${i + 1}`;
    newID = newID.slice(newID.length - 2, newID.length);
    const studentID = `HS${course}${newClassIDString}${newID}`;
    const newStudent = new Student(
      studentID,
      studentID,
      identityCard,
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

    const newDad = new Relatives(studentID, "Cha", dad, dadPhoneNumber);
    await Relatives.Save(newDad);
    const newMom = new Relatives(studentID, "Me", mom, momPhoneNumber);
    await Relatives.Save(newMom);
  }

  req.flash("success_msg", "Thêm lớp học mới thành công.");
  res.redirect("/staff/class");
};

module.exports = postClass;
