const Semester = require("../../../Model/Class/Semester");

const getSemester = async (req, res, next) => {
  const listSemester = await Semester.Find();

  listSemester.sort((a, b) => {
    if (a.yearStart < b.yearStart) return 1;
    if (a.yearStart > b.yearStart) return -1;
    if (a.semesterID < b.semesterID) return 1;
    if (a.semesterID > b.semesterID) return -1;

    return 0;
  });

  for (let i = 0; i < listSemester.length; i++) {
    listSemester[i].id = i + 1;
  }

  //console.log(listSemester);

  const latestSemester = listSemester[0];

  const nextSemester = { ...latestSemester };
  nextSemester.semesterID++;

  if (nextSemester.semesterID > 2) {
    nextSemester.yearStart++;
    nextSemester.yearEnd++;
    nextSemester.semesterID = 1;
  }

  res.render("admin/semesterManager", {
    title: `Danh sách học kỳ`,
    style: ["styleTable.css", "styleProfile.css"],
    user: req.user,
    listSemester,
    latestSemester,
    nextSemester,
  });
};

module.exports = getSemester;
