const Semester = require("../../../Model/Class/Semester");
const Class = require("../../../Model/Class/Class");
const Teacher = require("../../../Model/Class/Teacher");
const Student = require("../../../Model/Class/Student");

const getStudentInClass = async (req, res, next) => {
  const classID = req.params.classID;

  //Lấy các tham số từ query string url, nếu không có thì chuyển hướng về và thông báo lỗi.
  const { year, semester } = req.query;
  if (typeof year == "undefined" && typeof semester == "undefined") {
    req.flash("error_msg", "Vui lòng không truy cập trái phép.");
    res.redirect("/teacher/class");
  }

  //Phân tách year (type: string) => yearStart & yearEnd (type: number)
  //Chuyển semester (type: string) => semesterID (type: number)
  const yearArray = year.split("-");
  const yearStart = parseInt(yearArray[0]);
  const yearEnd = parseInt(yearArray[1]);
  let semesterID = parseInt(semester);

  //Lấy danh sách các lớp học mà giáo viên dạy trong học kỳ
  const listClass = await req.user.getClass(semesterID, yearStart, yearEnd);

  //Kiểm tra giáo viên có dạy lớp "classID" trong học kỳ đã truyền vào hay không?
  //Nếu không thì tiến hành chuyển hướng và thông báo lỗi
  let isTrue = true;

  for (let i = 0; i < listClass.length; i++) {
    if (classID === listClass[i].classID) {
      isTrue = false;
      break;
    }
  }

  if (isTrue === true) {
    req.flash(
      "error_msg",
      `Bạn không dạy lớp ${classID} trong học kỳ ${semester}, năm học ${yearStart}-${yearEnd}`
    );
    req.flash("error_msg", `Vui lòng không truy cập trái phép.`);
    res.redirect("/teacher/class");
  } else {
    //Nếu không lỗi thì tiến hành lấy danh sách điểm để hiển thị

    //Lấy trạng thái của học kỳ
    // => Mục đích: có hiển thị nút chỉnh sửa điểm hay không
    //Nếu trạng thái của học kỳ là 0 (~disable: học kỳ đã đóng) thì không hiển thị nút chỉnh sửa điểm
    //Nếu trạng thái của học kỳ là 1 (~enable: học kỳ còn đang mở) thì cho phép sửa điểm.
    let semesterTemp = await Semester.Find(semesterID, yearStart, yearEnd);
    if (!semesterTemp) {
      semesterTemp = await Semester.getLatestSemester();
      semesterID = semesterTemp.getSemesterID();
      isLastSemester = false;
    }

    const statusSemester = semesterTemp.getStatus();

    //Tạo action cho các form
    const actionForm = `/teacher/class/${classID}`;
    const actionFormExcel = `/teacher/class/excel/${classID}`;

    const managerClassID = (await Class.Find(classID)).getManagerClass();
    const managerClassName = (await Teacher.Find(managerClassID)).getFullName();
    const className = await Class.GetClassName(classID);

    //Lấy danh sách điểm của học sinh
    const listScores =
      (await req.user.getScore(classID, semesterID, yearStart, yearEnd)) || [];

    //Xử lý điểm đã lấy để hiển thị
    const listScoreView = [];
    if (listScores !== null) {
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
          dataTarget: `modalScoreEditHS${i + 1}`,
          statusSemester,
        };

        student.gpa =
          Math.round((10 * (score1 + score2 + 2 * score3 + 3 * score4)) / 7) /
          10;
        listScoreView.push(student);
      }
    }
    //Render kết quả
    res.render("teacher/score", {
      title: `Lớp học ${className} (${classID})`,
      style: ["styleTable.css"],
      user: req.user,
      listScoreView,
      actionForm,
      actionFormExcel,
      year,
      semesterID,
      managerClassName,
      className,
      classID,
      statusSemester,
    });
  }
};

module.exports = getStudentInClass;
