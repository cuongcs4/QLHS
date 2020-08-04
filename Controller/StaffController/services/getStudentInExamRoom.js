const flagClass = require("../../../ModelClass/Helper/resource/Flag");
const Class = require("../../../ModelClass/Class/Class");

const getStudentInExamRoom = async (req, res, next) => {
  const { roomID, semesterID, year } = req.query;

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

  for (let i = 0; i < listStudent.length; i++) {
    const { gender, dob, classID } = listStudent[i];
    listStudent[i].count = i + 1;
    listStudent[i].gender = gender === flagClass.GENDER.MALE ? "Nam" : "Nữ";
    listStudent[i].dob = `${dob.getDate()}/${
      dob.getMonth() + 1
    }/${dob.getFullYear()}`;
    listStudent[i].className = await Class.GetClassName(classID);
  }

  //res.send({ roomID, semesterID, year, listStudent });

  res.render("staff/examRoom_studentListTable", {
    title: `Danh sách học sinh phòng thi ${roomID}`,
    style: ["styleTable.css"],
    user: req.user,
    listStudent,
    year,
    semesterID,
  });
};

module.exports = getStudentInExamRoom;
