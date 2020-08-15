const ExamPlan = require("../../../Model/Class/ExamPlan");
const Subject = require("../../../Model/Class/Subject");
const Room = require("../../../Model/Class/Room");
const Teacher = require("../../../Model/Class/Teacher");

const parseForm = require("../../../Model/Helper/services/parseFormFormidable");
const parseFileExcel = require("../../../Model/Helper/services/parseFileExcel");

const formatFileExcel = require("../../../Model/Helper/resource/formatFileExcel");
const Semester = require("../../../Model/Class/Semester");

const postExam = async (req, res, next) => {
  const { path, fields } = await parseForm(req);

  const { claSs, year, semesterID } = fields;

  const { data, err } = parseFileExcel(path, formatFileExcel.examFormat);

  if (err.length !== 0) {
    req.flash("error_msg", err);
    res.redirect(`/staff/exam?claSs=${claSs}`);
  }

  if (data.length === 0) {
    req.flash("error_msg", "File không có dữ liệu.");
    res.redirect(`/staff/exam?claSs=${claSs}`);
  }

  //check dữ liệu
  for (let i = 0; i < data.length; i++) {
    const { subjectID, roomID, supervisorID1, supervisorID2 } = data[i];

    //1. check mã môn
    const subject = await Subject.Find(subjectID);
    if (subject === null) {
      req.flash(
        "error_msg",
        `Không có mã môn học "${subjectID}" (dòng ${i + 2})`
      );
      res.redirect(`/staff/exam?claSs=${claSs}`);
      return;
    }

    //2. check mã phòng
    const roomStringID = `0${roomID}`;
    const roomExamID = roomStringID.slice(
      roomStringID.length - 2,
      roomStringID.length
    );

    const room = await Room.Find(roomExamID);
    if (room === null) {
      req.flash("error_msg", `Không có phòng mã "${roomID}" (dòng ${i + 2})`);
      res.redirect(`/staff/exam?claSs=${claSs}`);
      return;
    }

    //3. check Mã giáo viên
    const teacher1 = await Teacher.Find(supervisorID1);
    if (teacher1 === null) {
      req.flash(
        "error_msg",
        `Không giáo viên mã "${supervisorID1}" (dòng ${i + 2})`
      );
      res.redirect(`/staff/exam?claSs=${claSs}`);
      return;
    }
    const teacher2 = await Teacher.Find(supervisorID2);
    if (teacher2 === null) {
      req.flash(
        "error_msg",
        `Không giáo viên mã "${supervisorID2}" (dòng ${i + 2})`
      );
      res.redirect(`/staff/exam?claSs=${claSs}`);
      return;
    }
  }

  //console.log(data);

  const yearArray = year.split("-");
  const yearStart = parseInt(yearArray[0]);
  const yearEnd = parseInt(yearArray[1]);

  const semester = await Semester.Find(semesterID, yearStart, yearEnd);

  //Lưu dữ liệu
  for (let i = 0; i < data.length; i++) {
    const {
      subjectID,
      roomID,
      dayExam,
      startSection,
      supervisorID1,
      supervisorID2,
    } = data[i];

    const roomStringID = `0${roomID}`;
    const roomExamID = roomStringID.slice(
      roomStringID.length - 2,
      roomStringID.length
    );

    const newExamPlan = new ExamPlan(
      null,
      semester,
      roomExamID,
      subjectID,
      dayExam,
      startSection,
      claSs,
      supervisorID1,
      supervisorID2
    );

    //console.log(newExamPlan);

    await ExamPlan.Save(newExamPlan);

    //console.log(newExamPlan);
  }

  req.flash("success_msg", `Đã lưu thành công ${data.length} dòng.`);

  res.redirect(`/staff/exam?claSs=${claSs}`);
};

module.exports = postExam;
