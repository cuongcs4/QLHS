const handleSemester = require("../../../Model/Helper/services/handleSemester");
const Semester = require("../../../Model/Class/Semester");

const getReport = async (req, res, next) => {
  const { year, semester } = req.query;

  const { allYearSemester, isLastSemester } = await handleSemester(
    year,
    semester
  );

  let semesterID, yearStart, yearEnd;

  if (typeof year === "undefined" || typeof semester === "undefined") {
    const latestSemester = await Semester.getLatestSemester();
    semesterID = latestSemester.getSemesterID();
    yearStart = latestSemester.getYearStart();
    yearEnd = latestSemester.getYearEnd();
  } else {
    const yearArray = year.split("-");
    semesterID = parseInt(semester);
    yearStart = parseInt(yearArray[0]);
    yearEnd = parseInt(yearArray[1]);
  }

  //Đếm số lớp học
  const listClass = await req.user.getClass();
  const countClass = {
    total: 0,
    listClass10: 0,
    listClass11: 0,
    listClass12: 0,
  };

  for (let i in listClass) {
    for (let j in listClass[i]) {
      countClass.total += 1;
      countClass[i] += 1;
    }
  }

  //Lấy điểm
  const listScore = await req.user.getScore(semesterID, yearStart, yearEnd);
  let countStudent = { total: 0, class10: 0, class11: 0, class12: 0 };
  const totalScore = {
    type1: { quantity: 0, percent: 0 },
    type2: { quantity: 0, percent: 0 },
    type3: { quantity: 0, percent: 0 },
    type4: { quantity: 0, percent: 0 },
    type5: { quantity: 0, percent: 0 },
  };

  for (let i in listScore) {
    for (let j in listScore[i]) {
      const count = listScore[i][j];
      listScore[i][j] = { quantity: count, percent: 0 };

      totalScore[j].quantity += count;
      countStudent.total += count;
      countStudent[i] += count;
    }
  }

  for (let i in listScore) {
    for (let j in listScore[i]) {
      listScore[i][j].percent =
        Math.round((listScore[i][j].quantity / countStudent[i]) * 100) || 0;

      totalScore[j].percent = Math.round(
        (totalScore[j].quantity / countStudent["total"]) * 100
      );
    }
  }

  totalScore.id = `pieChartScoreTotal`;

  listScore.class10.id = `pieChartScoreClass10`;
  listScore.class11.id = `pieChartScoreClass11`;
  listScore.class12.id = `pieChartScoreClass12`;

  //Lấy hạnh kiểm
  const listConduct = await req.user.getConduct(semesterID, yearStart, yearEnd);

  const totalConduct = {
    type1: { quantity: 0, percent: 0 },
    type2: { quantity: 0, percent: 0 },
    type3: { quantity: 0, percent: 0 },
    type4: { quantity: 0, percent: 0 },
  };

  for (let i in listConduct) {
    for (let j in listConduct[i]) {
      const count = listConduct[i][j];
      listConduct[i][j] = { quantity: count, percent: 0 };

      totalConduct[j].quantity += count;
    }
  }

  for (let i in listConduct) {
    for (let j in listConduct[i]) {
      listConduct[i][j].percent =
        Math.round((listConduct[i][j].quantity / countStudent[i]) * 100) || 0;

      totalConduct[j].percent = Math.round(
        (totalConduct[j].quantity / countStudent["total"]) * 100
      );
    }
  }

  totalConduct.id = `pieChartConductTotal`;

  listConduct.class10.id = `pieChartConductClass10`;
  listConduct.class11.id = `pieChartConductClass11`;
  listConduct.class12.id = `pieChartConductClass12`;

  res.render("staff/report", {
    title: "Báo cáo",
    style: ["styleTable.css"],
    user: req.user,
    allYearSemester,
    isLastSemester,
    countStudent,
    totalScore,
    totalConduct,
    listScore,
    listConduct,
    countClass,
    year: `${yearStart}-${yearEnd}`,
    semesterID,
  });
};

module.exports = getReport;
