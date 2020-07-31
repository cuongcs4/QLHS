const Score = require("../../../ModelClass/Class/Score");
const Semester = require("../../../ModelClass/Class/Semester");

const parseFileExcel = require("../../../ModelClass/Helper/services/parseFileExcel");
const parseForm = require("../../../ModelClass/Helper/services/parseFormFormidable");

const formatFileExcel = require("../../../ModelClass/Helper/resource/formatFileExcel");

const postStudentInClassExcel = async (req, res, next) => {
  const form = await parseForm(req);

  const path = form.path;
  const { classID } = form.fields;

  const { data, err } = parseFileExcel(path, formatFileExcel.scoreFormat);

  const latestSemester = await Semester.getLatestSemester();
  const { semesterID, yearStart, yearEnd } = latestSemester;

  //Kiểm tra nếu có lỗi
  if (err.length !== 0) {
    req.flash("error_msg", err);
    res.redirect(
      `/teacher/class/${classID}?semester=${semesterID}&year=${yearStart}-${yearEnd}`
    );
  }

  //Kiểm tra nếu không có dữ liệu
  if (data.length === 0) {
    req.flash("error_msg", "Vui lòng kiểm tra lại file, file rỗng");
    res.redirect(
      `/teacher/class/${classID}?semester=${semesterID}&year=${yearStart}-${yearEnd}`
    );
  }

  //Kiểm tra có trùng khớp lơp hay không
  for (let i = 0; i < data.length; i++) {
    const studentID = data[i].studentId;
    const classIDStudent = `LH${studentID.slice(2, 8)}`;

    if (classID !== classIDStudent) {
      req.flash(
        "error_msg",
        `Mã học sinh không đúng. (Hàng ${i + 1}, MHS: ${studentID})`
      );
      res.redirect(
        `/teacher/class/${classID}?semester=${semesterID}&year=${yearStart}-${yearEnd}`
      );
    }
  }

  //Tiến hành cập nhật điểm cho học sinh.
  const subjectID = req.user.getSubjectID();
  const teacherID = req.user.getID();

  for (let i = 0; i < data.length; i++) {
    const { studentId, score1, score2, score3, score4 } = data[i];

    if (
      score1 < 0 ||
      score2 < 0 ||
      score3 < 0 ||
      score4 < 0 ||
      score1 > 10 ||
      score2 > 10 ||
      score3 > 10 ||
      score4 > 10
    ) {
      req.flash(
        "error_msg",
        `Điểm không hợp lệ. (Hàng ${i + 1}, MHS: ${studentId})`
      );
      res.redirect(
        `/teacher/class/${classID}?semester=${semesterID}&year=${yearStart}-${yearEnd}`
      );
    } else {
      const score = new Score(
        latestSemester,
        studentId,
        teacherID,
        classID,
        subjectID,
        score1,
        score2,
        score3,
        score4
      );

      Score.Save(score);
    }
  }

  req.flash("success_msg", "Thành công.");
  res.redirect(
    `/teacher/class/${classID}?semester=${semesterID}&year=${yearStart}-${yearEnd}`
  );
};

module.exports = postStudentInClassExcel;
