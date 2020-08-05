const ResultSurvey = require("../../../ModelClass/Class/ResultSurvey");
const QuestionSurvey = require("../../../ModelClass/Class/QuestionSurvey");

const exportFileExcel = require("../../../ModelClass/Helper/services/exportFileExcel");
const deleteFile = require("../../../ModelClass/Helper/services/deleteFile");

const formatFileExcel = require("../../../ModelClass/Helper/resource/formatFileExcel");

const postSurveyExport = async (req, res, next) => {
  const { year, semesterID } = req.body;

  const yearArray = year.split("-");
  const yearStart = yearArray[0];
  const yearEnd = yearArray[1];

  //Lấy số phiếu đã làm
  const sumSurvey = await ResultSurvey.CountStudentDoSurvey(
    semesterID,
    yearStart,
    yearEnd
  );

  //Lấy toàn bộ câu hỏi:
  const allQuestion = await QuestionSurvey.Find();

  //Lấy kết quả khảo sát.
  const resultSurvey =
    (await ResultSurvey.Find(semesterID, yearStart, yearEnd)) || [];

  //Phân loại theo từng câu
  const question = {
    question1: {
      id: "question1",
      questionID: "Câu 1",
      content: "",
      quantity: { type1: 0, type2: 0, type3: 0, type4: 0 },
      percent: { type1: 0, type2: 0, type3: 0, type4: 0 },
    },
    question2: {
      id: "question2",
      questionID: "Câu 2",
      content: "",
      quantity: { type1: 0, type2: 0, type3: 0, type4: 0 },
      percent: { type1: 0, type2: 0, type3: 0, type4: 0 },
    },
    question3: {
      id: "question3",
      questionID: "Câu 3",
      content: "",
      quantity: { type1: 0, type2: 0, type3: 0, type4: 0 },
      percent: { type1: 0, type2: 0, type3: 0, type4: 0 },
    },
    question4: {
      id: "question4",
      questionID: "Câu 4",
      content: "",
      quantity: { type1: 0, type2: 0, type3: 0, type4: 0 },
      percent: { type1: 0, type2: 0, type3: 0, type4: 0 },
    },
    question5: {
      id: "question5",
      questionID: "Câu 5",
      content: "",
      quantity: { type1: 0, type2: 0, type3: 0, type4: 0 },
      percent: { type1: 0, type2: 0, type3: 0, type4: 0 },
    },
    question6: {
      id: "question6",
      questionID: "Câu 6",
      content: "",
      quantity: { type1: 0, type2: 0, type3: 0, type4: 0 },
      percent: { type1: 0, type2: 0, type3: 0, type4: 0 },
    },
    question7: {
      id: "question7",
      questionID: "Câu 7",
      content: "",
      quantity: { type1: 0, type2: 0, type3: 0, type4: 0 },
      percent: { type1: 0, type2: 0, type3: 0, type4: 0 },
    },
    question8: {
      id: "question8",
      questionID: "Câu 8",
      content: "",
      quantity: { type1: 0, type2: 0, type3: 0, type4: 0 },
      percent: { type1: 0, type2: 0, type3: 0, type4: 0 },
    },
    question9: {
      id: "question9",
      questionID: "Câu 9",
      content: "",
      quantity: { type1: 0, type2: 0, type3: 0, type4: 0 },
      percent: { type1: 0, type2: 0, type3: 0, type4: 0 },
    },
    question10: {
      id: "question10",
      questionID: "Câu 10",
      content: "",
      quantity: { type1: 0, type2: 0, type3: 0, type4: 0 },
      percent: { type1: 0, type2: 0, type3: 0, type4: 0 },
    },
  };

  //Thêm mã câu hỏi, nội dung câu hỏi.
  for (let i = 0; i < allQuestion.length; i++) {
    question[`question${allQuestion[i].idQuestion}`].content =
      allQuestion[i].content;
  }

  //Đếm, phân loại
  for (let i = 0; i < resultSurvey.length; i++) {
    question[`question${resultSurvey[i].idQuestion}`].quantity[
      `type${resultSurvey[i].answer}`
    ]++;
  }

  //Tính %
  for (let i in question) {
    const { type1, type2, type3, type4 } = question[i].quantity;

    const sum = type1 + type2 + type3 + type4;

    question[i].percent.type1 = Math.round((type1 / sum) * 100) || 0;
    question[i].percent.type2 = Math.round((type2 / sum) * 100) || 0;
    question[i].percent.type3 = Math.round((type3 / sum) * 100) || 0;
    question[i].percent.type4 = Math.round((type4 / sum) * 100) || 0;
  }

  const questionArray = Object.keys(question).map((key) => question[key]);

  const data = [];

  for (let i = 0; i < questionArray.length; i++) {
    const line = [];
    line.push(i + 1);

    line.push(questionArray[i].content);
    line.push(
      `${questionArray[i].quantity.type1} (${questionArray[i].percent.type1}%)`
    );
    line.push(
      `${questionArray[i].quantity.type2} (${questionArray[i].percent.type2}%)`
    );
    line.push(
      `${questionArray[i].quantity.type3} (${questionArray[i].percent.type3}%)`
    );
    line.push(
      `${questionArray[i].quantity.type4} (${questionArray[i].percent.type4}%)`
    );

    data.push(line);
  }

  const path = await exportFileExcel(data, formatFileExcel.surveyFormat);

  res.download(
    path,
    `Kết quả khảo sát học kỳ ${semesterID} năm học ${year}.xlsx`
  );

  deleteFile(path);
};

module.exports = postSurveyExport;
