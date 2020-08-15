const Semester = require("../../Class/Semester");

//Lấy toàn bộ học kỳ, xử lý để hiển thị trong thanh chọn năm học và học kỳ.
const handleSemester = async (yearString, semesterID) => {
  let allYearSemester = await Semester.Find();

  //Sắp xếp học kỳ
  allYearSemester.sort((a, b) => {
    if (a.yearStart < b.yearStart) {
      return 1;
    }

    if (a.yearStart > b.yearStart) {
      return -1;
    }

    // a == b
    if (a.semesterID < b.semesterID) {
      return 1;
    }

    if (a.semesterID > b.semesterID) {
      return -1;
    }
    return 0;
  });

  let isLastSemester = allYearSemester[0].semesterID === 2 ? true : false;

  //Chuyển đổi mảng object thành mảng chuỗi
  allYearSemester = allYearSemester.map((year) => {
    if (year.semesterID === 2) return;
    return `${year.yearStart}-${year.yearEnd}`;
  });

  //Kiểm tra cách hiển thị
  if (typeof yearString != "undefined") {
    isLastSemester = parseInt(semesterID) === 2 ? true : false;

    for (let i = 0; i < allYearSemester.length; i++) {
      if (yearString === allYearSemester[i]) {
        allYearSemester[i] = allYearSemester[0];
        allYearSemester[0] = yearString;
        break;
      }
    }
  }

  return { allYearSemester, isLastSemester };
};

module.exports = handleSemester;
