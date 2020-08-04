const Class = require("../../../ModelClass/Class/Class");

const exportFileExcel = require("../../../ModelClass/Helper/services/exportFileExcel");
const deleteFile = require("../../../ModelClass/Helper/services/deleteFile");

const formatFileExcel = require("../../../ModelClass/Helper/resource/formatFileExcel");
const flagClass = require("../../../ModelClass/Helper/resource/Flag");

const postStudentInClassExportExcel = async (req, res, next) => {
  const { roomID, semesterID, year } = req.body;

  if (
    typeof roomID === "undefined" ||
    typeof semesterID === "undefined" ||
    typeof year === "undefined"
  ) {
    req.flash("error_msg", "Thiếu thông tin truy vấn.");
    res.redirect("/staff/room-exam");
  }

  const yearArry = year.split("-");
  const yearStart = parseInt(yearArry[0]);
  const yearEnd = parseInt(yearArry[1]);

  const listStudent =
    (await req.user.getStudentExamRoom(
      roomID,
      semesterID,
      yearStart,
      yearEnd
    )) || [];

  const listStudentExport = [];
  for (let i = 0; i < listStudent.length; i++) {
    const { gender, dob, classID, studentFullName, studentID } = listStudent[i];

    const count = i + 1;
    const className = await Class.GetClassName(classID);

    listStudentExport.push({
      count,
      studentID,
      studentFullName,
      classID,
      className,
      dob: `${dob.getDate()}/${dob.getMonth() + 1}/${dob.getFullYear()}`,
      gender,
    });
  }

  console.log(listStudentExport);

  const path = await exportFileExcel(
    listStudentExport,
    formatFileExcel.studentInExamRoomFormat
  );

  res.download(
    path,
    `Danh sách học sinh phòng thi ${roomID} học kỳ ${semesterID} năm học ${yearStart}-${yearEnd}.xlsx`
  );

  deleteFile(path);
};

module.exports = postStudentInClassExportExcel;
