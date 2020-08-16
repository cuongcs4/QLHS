const Conduct = require("../../../Model/Class/Conduct");
const Semester = require("../../../Model/Class/Semester");

const parseFileExcel = require("../../../Model/Helper/services/parseFileExcel");
const parseForm = require("../../../Model/Helper/services/parseFormFormidable");

const formatFileExcel = require("../../../Model/Helper/resource/formatFileExcel");
const flagClass = require("../../../Model/Helper/resource/Flag");

const postManagerClassScoreExcel = async (req, res, next) => {
  const { path, fields } = await parseForm(req);

  const { classID } = fields;

  const { data, err } = parseFileExcel(path, formatFileExcel.conductFormat);

  //Kiểm tra nếu có lỗi
  if (err.length !== 0) {
    req.flash("error_msg", err);
    res.redirect(`/teacher/managerClass/score`);
  }

  //Kiểm tra nếu không có dữ liệu
  if (data.length === 0) {
    req.flash("error_msg", "Vui lòng kiểm tra lại file, file rỗng");
    res.redirect(`/teacher/managerClass/score`);
  }

  //Kiểm tra có trùng khớp lơp hay không
  for (let i = 0; i < data.length; i++) {
    const studentID = data[i].studentId;
    const classIDStudent = `LH${studentID.slice(2, 8)}`;

    switch (data[i].grade.toLowerCase()) {
      case "tốt":
        data[i].grade = flagClass.CONDUCT.TYPE_1;
        break;
      case "khá":
        data[i].grade = flagClass.CONDUCT.TYPE_2;
        break;
      case "tb":
        data[i].grade = flagClass.CONDUCT.TYPE_3;
        break;
      case "yếu":
        data[i].grade = flagClass.CONDUCT.TYPE_4;
        break;

      default:
        req.flash(
          "error_msg",
          `Loại hạnh kiểm không đúng. (Hàng ${i + 1}, MHS: ${studentID})`
        );
        req.flash("error_msg", `Các loại: tốt - khá - tb - yếu`);
        res.redirect(`/teacher/managerClass/score`);
    }

    if (classID !== classIDStudent) {
      req.flash(
        "error_msg",
        `Mã học sinh không đúng. (Hàng ${i + 1}, MHS: ${studentID})`
      );
      res.redirect(`/teacher/managerClass/score`);
    }
  }

  //console.log(data);

  //Tiến hành cập nhật
  const latestSemester = await Semester.getLatestSemester();

  for (let i = 0; i < data.length; i++) {
    const { studentId, grade } = data[i];
    const { classID, id } = req.user;
    const newConduct = new Conduct(
      latestSemester,
      studentId,
      classID,
      id,
      grade
    );

    Conduct.Save(newConduct);
  }

  req.flash("success_msg", "Thành công.");
  res.redirect("/teacher/managerClass/score");
};

module.exports = postManagerClassScoreExcel;
