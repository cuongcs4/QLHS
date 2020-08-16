const handleSemester = require("../../../Model/Helper/services/handleSemester");
const Subject = require("../../../Model/Class/Subject");
const Semester = require("../../../Model/Class/Semester");
const flagClass = require("../../../Model/Helper/resource/Flag");
const getResultTable = async (req, res, next) => {
  let { year, semester } = req.query;
  const error_msg = [];

  //Lấy tất cả các học kỳ đã có
  let { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );

  let semesterID, yearStart, yearEnd;

  if (typeof year == "undefined" && typeof semester == "undefined") {
    const latestSemester = await Semester.getLatestSemester();
    semesterID = latestSemester.getSemesterID();
    yearStart = latestSemester.getYearStart();
    yearEnd = latestSemester.getYearEnd();
  } else {
    const yearArray = year.split("-");
    yearStart = parseInt(yearArray[0]);
    yearEnd = parseInt(yearArray[1]);
    semesterID = parseInt(semester);

    const isExistSemester = await Semester.Find(semesterID, yearStart, yearEnd);
    if (!isExistSemester) {
      error_msg.push(
        `Học kỳ ${semesterID} năm học ${yearStart}-${yearEnd} chưa có dữ liệu.`
      );

      const latestSemester = await Semester.getLatestSemester();
      semesterID = latestSemester.getSemesterID();
      yearStart = latestSemester.getYearStart();
      yearEnd = latestSemester.getYearEnd();

      isLastSemester = false;
    }
  }

  const listScores = await req.user.getScore(semesterID, yearStart, yearEnd);

  const listScoreView = [];
  if (listScores !== null) {
    for (let i = 0; i < listScores.length; i++) {
      const { subjectName, score1, score2, score3, score4 } = listScores[i];

      const score = {
        id: i + 1,
        subjectName,
        score1,
        score2,
        score3,
        score4,
      };
      score.gpa =
        Math.round((10 * (score1 + score2 + 2 * score3 + 3 * score4)) / 7) / 10;
      listScoreView.push(score);
    }
  }
  const listSubject = await Subject.Find();
  const listSubjectView = [];
  if (listSubject !== null) {
    for (let i = 0; i < listSubject.length; i++) {
      const { subjectID, subjectName } = listSubject[i];
      listSubjectView.push({
        subject: subjectID,
        subjectName,
      });
    }
  }

  const GPA = await req.user.getGPA(semesterID, yearStart, yearEnd);
  let conduct = await req.user.getConduct(semesterID, yearStart, yearEnd);
  let classifyGPA = await req.user.classifyAverageScore(
    semesterID,
    yearStart,
    yearEnd
  );

  switch (classifyGPA) {
    case flagClass.SCORE.TYPE_1:
      classifyGPA = "GIỎI";
      break;

    case flagClass.SCORE.TYPE_2:
      classifyGPA = "KHÁ";
      break;

    case flagClass.SCORE.TYPE_3:
      classifyGPA = "TRUNG BÌNH";
      break;

    case flagClass.SCORE.TYPE_4:
      classifyGPA = "YẾU";
      break;

    case flagClass.SCORE.TYPE_5:
      classifyGPA = "KÉM";
      break;
  }

  switch (conduct) {
    case flagClass.SCORE.TYPE_1:
      conduct = "TỐT";
      break;

    case flagClass.SCORE.TYPE_2:
      conduct = "KHÁ";
      break;

    case flagClass.SCORE.TYPE_3:
      conduct = "TRUNG BÌNH";
      break;

    case flagClass.SCORE.TYPE_4:
      conduct = "YẾU";
      break;
  }

  console.log(semesterID, yearStart, yearEnd);

  // render kết quảs
  res.render("student/resultTable", {
    title: "Kết quả học tập",
    style: ["styleTable.css"],
    user: req.user,
    listScoreView,
    allYearSemester,
    isLastSemester,
    listSubjectView,
    error_msg,
    GPA,
    conduct,
    classifyGPA,
  });
};

module.exports = getResultTable;
