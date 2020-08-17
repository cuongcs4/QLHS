const ReExamination = require("../../../Model/Class/ReExamination");
const Semester = require("../../../Model/Class/Semester");
const TeachingPlan = require("../../../Model/Class/TeachingPlan");
const Flag = require("../../../Model/Helper/resource/Flag");
const generateGUID = require("../../../Model/Helper/services/generateGUID");

const postReExamination = async (req, res, next) => { 
  const { studentID, content, subjectID, classID } = req.body;
  const classSchedule = await TeachingPlan.Find({
    classID: classID,
    teacherID: null,
  });
  let teacherID;
  if (classSchedule.length !== 0) {
    for (let i = 0; i < classSchedule.length; i++) {
      if (subjectID === classSchedule[i].subjectID) {
        teacherID = classSchedule[i].teacherID;
        break;
      }
    }
  }
  const id = generateGUID();
  const semester = await Semester.getLatestSemester();
  const reExamination = new ReExamination(
    id,
    semester,
    studentID,
    teacherID,
    subjectID,
    content,
    null,
    "0"
  );
  //console.log(reExamination);

  ReExamination.Save(reExamination);

  req.flash("success_msg", "Đã tạo phúc khảo");

  res.redirect(`/student/reExamination`);
};

module.exports = postReExamination;
