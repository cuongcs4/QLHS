const Semester = require("../../../Model/Class/Semester");
const Class = require("../../../Model/Class/Class");
const Teacher = require("../../../Model/Class/Teacher");
const Student = require("../../../Model/Class/Student");

const exportFileExcel = require("../../../Model/Helper/services/exportFileExcel");
const deleteFile = require("../../../Model/Helper/services/deleteFile");

const formatFileExcel = require("../../../Model/Helper/resource/formatFileExcel");

const postStudentInClassExportExcel = async (req, res, next) => {
  //Lấy các tham số từ query string url, nếu không có thì chuyển hướng về và thông báo lỗi.
  const { year, semester, classID } = req.body;

  //res.send({ year, semester, classID });

  //Phân tách year (type: string) => yearStart & yearEnd (type: number)
  //Chuyển semester (type: string) => semesterID (type: number)
  const yearArray = year.split("-");
  const yearStart = parseInt(yearArray[0]);
  const yearEnd = parseInt(yearArray[1]);
  const semesterID = parseInt(semester);
  const className = await Class.GetClassName(classID);

  //Lấy danh sách điểm của học sinh
  const listScores = await req.user.getScore(
    classID,
    semesterID,
    yearStart,
    yearEnd
  );

  //Xử lý điểm đã lấy để hiển thị
  const listScoreView = [];

  for (let i = 0; i < listScores.length; i++) {
    const result = await Student.Find({
      id: listScores[i].studentID,
      classID: null,
    });

    const { studentID, score1, score2, score3, score4 } = listScores[i];

    const student = {
      id: i + 1,
      studentID,
      fullName: result.fullName,
      score1,
      score2,
      score3,
      score4,
    };

    student.gpa =
      Math.round((10 * (score1 + score2 + 2 * score3 + 3 * score4)) / 7) / 10;
    listScoreView.push(student);
  }

  const path = await exportFileExcel(
    listScoreView,
    formatFileExcel.scoreFormatExport
  );

  //res.send(path);

  res.download(
    path,
    `Bảng điểm tổng kết môn ${className} học kỳ ${semesterID} năm học ${yearStart}-${yearEnd}.xlsx`
  );
  deleteFile(path);
  return;
};

module.exports = postStudentInClassExportExcel;
