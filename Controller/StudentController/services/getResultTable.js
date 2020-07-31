const handleSemester = require("../../../ModelClass/Helper/services/handleSemester");

const getResultTable = async (req, res, next) => {
  let { year, semester } = req.query;
  //Lấy tất cả các học kỳ đã có
  const { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );
  let listScores = [];
  if (typeof year == "undefined" && typeof semester == "undefined") {
    listScores = await req.user.getScore();
  } else {
    const yearArray = year.split("-");
    const yearStart = parseInt(yearArray[0]);
    const yearEnd = parseInt(yearArray[1]);
    const semesterID = parseInt(semester);

    listScores = await req.user.getScore(semesterID, yearStart, yearEnd);
  }
  const listScoreView = [];
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
  console.log(listScoreView);
  // render kết quảs
  res.render("student/resultTable", {
    title: "Kết quả học tập",
    style: ["styleTable.css"],
    user: req.user,
    listScoreView,
    allYearSemester,
    isLastSemester,
  });
};

module.exports = getResultTable;