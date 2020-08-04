const ExamPlan = require("../../../ModelClass/Class/ExamPlan");
const Subject = require("../../../ModelClass/Class/Subject");
const Room = require("../../../ModelClass/Class/Room");
const Teacher = require("../../../ModelClass/Class/Teacher");

const postEditExam = async (req, res, next) => {
  const {
    id,
    subjectID,
    roomID,
    dayExam,
    section,
    supervisor1,
    supervisor2,
  } = req.body;

  const claSs = req.body.class;

  //1. check mã môn
  const subject = await Subject.Find(subjectID);
  if (subject === null) {
    req.flash("error_msg", `Không có mã môn học "${subjectID}"`);
    res.redirect(`/staff/exam?claSs=${claSs}`);
  }

  //2. check mã phòng
  const room = await Room.Find(roomID);
  if (room === null) {
    req.flash("error_msg", `Không có phòng mã "${roomID}"`);
    res.redirect(`/staff/exam?claSs=${claSs}`);
  }

  //3. check Mã giáo viên
  const teacher1 = await Teacher.Find(supervisor1);
  if (teacher1 === null) {
    req.flash("error_msg", `Không giáo viên mã "${supervisor1}"`);
    res.redirect(`/staff/exam?claSs=${claSs}`);
  }
  const teacher2 = await Teacher.Find(supervisor2);
  if (teacher2 === null) {
    req.flash("error_msg", `Không giáo viên mã "${supervisor2}"`);
    res.redirect(`/staff/exam?claSs=${claSs}`);
  }

  const examPlan = await ExamPlan.Find({
    id: id,
    studentID: null,
    teacherID: null,
  });

  examPlan.setSubjectID(subjectID);
  examPlan.setRoomExamID(roomID);
  examPlan.setDayExam(new Date(dayExam));
  examPlan.setStartSection(section);
  examPlan.setSupervisorID1(supervisor1);
  examPlan.setSupervisorID2(supervisor2);

  await ExamPlan.Save(examPlan);

  req.flash("success_msg", "Thành công");
  res.redirect(`/staff/exam?claSs=${claSs}`);
};

module.exports = postEditExam;
