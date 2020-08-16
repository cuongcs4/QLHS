const Semester = require("../../../Model/Class/Semester");
const Class = require("../../../Model/Class/Class");
const Student = require("../../../Model/Class/Student");

const handleSemester = require("../../../Model/Helper/services/handleSemester");

const flagClass = require("../../../Model/Helper/resource/Flag");

const getManagerClassScore = async (req, res, next) => {
  let { year, semester } = req.query;
  const error_msg = [];

  //Lấy tất cả các học kỳ đã có
  let { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );

  let semesterID, yearStart, yearEnd, statusSemester;

  if (typeof year != "undefined") {
    const yearArray = year.split("-");
    yearStart = parseInt(yearArray[0]);
    yearEnd = parseInt(yearArray[1]);
    semesterID = parseInt(semester);

    let semesterTemp = await Semester.Find(semesterID, yearStart, yearEnd);
    if (!semesterTemp) {
      error_msg.push(
        `Học kỳ ${semesterID} năm học ${yearStart}-${yearEnd} chưa có dữ liệu.`
      );
      semesterTemp = await Semester.getLatestSemester();
      semesterID = semesterTemp.getSemesterID();
      isLastSemester = false;
    }

    statusSemester = semesterTemp.getStatus();
  } else {
    const latestSemester = await Semester.getLatestSemester();
    semesterID = latestSemester.getSemesterID();
    yearStart = latestSemester.getYearStart();
    yearEnd = latestSemester.getYearEnd();
    statusSemester = latestSemester.getStatus();
  }

  //Lấy mã lớp và tên lớp.
  const classID = req.user.getClassID();
  const className = await Class.GetClassName(classID);

  //Lấy danh sách học sinh
  const listStudent = await Student.Find({ id: null, classID: classID });

  //Lấy danh sách điểm của học sinh
  const listScore = [];

  for (let i = 0; i < listStudent.length; i++) {
    const student = {
      fullName: listStudent[i].getFullName(),
      id: i + 1,
      isFill: i % 2 !== 0 ? true : false,
      dataTarget: `modalScoreEditHS${i + 1}`,
      studentID: listStudent[i].getID(),
      statusSemester,
    };

    const scores =
      (await listStudent[i].getScore(semesterID, yearStart, yearEnd)) || [];

    for (let j = 0; j < scores.length; j++) {
      student[`${scores[j].subjectID}`] =
        (scores[j].score1 +
          scores[j].score2 +
          2 * scores[j].score3 +
          3 * scores[j].score4) /
        7;
      student[`${scores[j].subjectID}`] =
        Math.round(student[`${scores[j].subjectID}`] * 10) / 10;
    }

    student[`gpa`] = await listStudent[i].getGPA(
      semesterID,
      yearStart,
      yearEnd
    );
    student[`classify`] = await listStudent[i].classifyAverageScore(
      semesterID,
      yearStart,
      yearEnd
    );
    student[`conductNumber`] = await listStudent[i].getConduct(
      semesterID,
      yearStart,
      yearEnd
    );

    switch (student[`classify`]) {
      case flagClass.SCORE.TYPE_1:
        student[`classify`] = "giỏi";
        break;

      case flagClass.SCORE.TYPE_2:
        student[`classify`] = "khá";
        break;

      case flagClass.SCORE.TYPE_3:
        student[`classify`] = "tb";
        break;

      case flagClass.SCORE.TYPE_4:
        student[`classify`] = "yếu";
        break;

      case flagClass.SCORE.TYPE_5:
        student[`classify`] = "kém";
        break;
    }

    switch (student[`conductNumber`]) {
      case flagClass.CONDUCT.TYPE_1:
        student[`conduct`] = "tốt";
        break;

      case flagClass.CONDUCT.TYPE_2:
        student[`conduct`] = "khá";
        break;

      case flagClass.CONDUCT.TYPE_3:
        student[`conduct`] = "tb";
        break;

      case flagClass.CONDUCT.TYPE_4:
        student[`conduct`] = "yếu";
        break;
    }

    listScore.push(student);
  }

  //Render kết quả
  res.render("teacher/managerClassScore", {
    title: `Quản lý lớp chủ nhiệm ${className}`,
    style: ["styleTable.css"],
    user: req.user,
    listScore,
    allYearSemester,
    isLastSemester,
    className,
    classID,
    managerClassName: req.user.getFullName(),
    statusSemester,
    semesterID,
    yearStart,
    yearEnd,
    error_msg,
  });
};

module.exports = getManagerClassScore;
