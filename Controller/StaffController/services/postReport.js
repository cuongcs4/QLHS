const exportExcel = require("../../../ModelClass/Helper/services/exportFileExcel");
const deleteFile = require("../../../ModelClass/Helper/services/deleteFile");
const formatFileExcel = require("../../../ModelClass/Helper/resource/formatFileExcel");

const postReport = async (req, res, next) => {
  const { year, semester } = req.body;

  let semesterID, yearStart, yearEnd;

  const yearArray = year.split("-");
  semesterID = parseInt(semester);
  yearStart = parseInt(yearArray[0]);
  yearEnd = parseInt(yearArray[1]);

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

  const dataScore = [];
  let classNumber = 10;
  for (let i in listScore) {
    const { type1, type2, type3, type4, type5 } = listScore[i];

    const line = [];
    line.push(classNumber);
    line.push(`${type1.quantity} (${type1.percent}%)`);
    line.push(`${type2.quantity} (${type2.percent}%)`);
    line.push(`${type3.quantity} (${type3.percent}%)`);
    line.push(`${type4.quantity} (${type4.percent}%)`);
    line.push(`${type5.quantity} (${type5.percent}%)`);

    dataScore.push(line);
    classNumber++;
  }

  {
    const { type1, type2, type3, type4, type5 } = totalScore;
    const line = [];
    line.push("Toàn trường");
    line.push(`${type1.quantity} (${type1.percent}%)`);
    line.push(`${type2.quantity} (${type2.percent}%)`);
    line.push(`${type3.quantity} (${type3.percent}%)`);
    line.push(`${type4.quantity} (${type4.percent}%)`);
    line.push(`${type5.quantity} (${type5.percent}%)`);

    dataScore.push(line);
  }

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

  const dataConduct = [];
  classNumber = 10;
  for (let i in listConduct) {
    const { type1, type2, type3, type4 } = listConduct[i];

    const line = [];
    line.push(classNumber);
    line.push(`${type1.quantity} (${type1.percent}%)`);
    line.push(`${type2.quantity} (${type2.percent}%)`);
    line.push(`${type3.quantity} (${type3.percent}%)`);
    line.push(`${type4.quantity} (${type4.percent}%)`);

    dataConduct.push(line);
    classNumber++;
  }

  {
    const { type1, type2, type3, type4 } = totalScore;
    const line = [];
    line.push("Toàn trường");
    line.push(`${type1.quantity} (${type1.percent}%)`);
    line.push(`${type2.quantity} (${type2.percent}%)`);
    line.push(`${type3.quantity} (${type3.percent}%)`);
    line.push(`${type4.quantity} (${type4.percent}%)`);

    dataConduct.push(line);
  }

  const path = await exportExcel(
    dataScore,
    formatFileExcel.reportScoreFormat,
    dataConduct,
    formatFileExcel.reportConductFormat
  );

  res.download(
    path,
    `Báo cáo học kỳ ${semesterID} năm học ${yearStart}-${yearEnd}.xlsx`
  );

  deleteFile(path);
};

module.exports = postReport;
