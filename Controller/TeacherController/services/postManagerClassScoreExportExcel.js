const fs = require("fs");

const Class = require("../../../Model/Class/Class");
const Student = require("../../../Model/Class/Student");

const exportFileExcel = require("../../../Model/Helper/services/exportFileExcel");
const deleteFile = require("../../../Model/Helper/services/deleteFile");

const formatFileExcel = require("../../../Model/Helper/resource/formatFileExcel");
const flagClass = require("../../../Model/Helper/resource/Flag");

const postManagerClassScoreExportExcel = async (req, res, next) => {
  {
    const { semesterID, yearStart, yearEnd } = req.body;

    //Lấy mã lớp và tên lớp.
    const classID = req.user.getClassID();
    const className = await Class.GetClassName(classID);

    //Lấy danh sách học sinh
    const listStudent = await Student.Find({ id: null, classID: classID });

    //Lấy danh sách điểm của học sinh
    const listScore = [];

    for (let i = 0; i < listStudent.length; i++) {
      const student = {
        id: i + 1,
        studentID: listStudent[i].getID(),
        fullName: listStudent[i].getFullName(),
        dob: listStudent[i].getDoB(),
        gender: listStudent[i].getGender(),
      };

      student[`Toan`] = 0;
      student[`VatLy`] = 0;
      student[`HoaHoc`] = 0;
      student[`SinhHoc`] = 0;
      student[`TinHoc`] = 0;
      student[`NguVan`] = 0;
      student[`LichSu`] = 0;
      student[`DiaLy`] = 0;
      student[`AnhVan`] = 0;
      student[`GDCD`] = 0;
      student[`CongNghe`] = 0;
      student[`TheDuc`] = 0;
      student[`GDQP`] = 0;

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
      student[`conduct`] = await listStudent[i].getConduct(
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

      switch (student[`conduct`]) {
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

    console.log(listScore);

    const path = await exportFileExcel(
      listScore,
      formatFileExcel.compositeTranscriptFormat
    );

    res.download(
      path,
      `Bảng điểm tổng kết ${className} học kỳ ${semesterID} năm học ${yearStart}-${yearEnd}.xlsx`
    );
    deleteFile(path);

    return;
  }
};

module.exports = postManagerClassScoreExportExcel;
