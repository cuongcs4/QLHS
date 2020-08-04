const removeAccents = require("../../../ModelClass/Helper/services/removeAccents");

const postExamRoomCreate = async (req, res, next) => {
  const maxStudent = req.body.maxStudent;

  const result = await req.user.createExamRoom(maxStudent);

  req.flash("success_msg", `Thành công.`);
  res.redirect("/staff/room-exam");
};

module.exports = postExamRoomCreate;

// const arr = [
//   "Nguyễn Văn An",
//   "Nguyễn Văn D",
//   "Nguyễn Văn Anh",
//   "Nguyễn Văn Ân",
// ];

// arr.sort((a, b) => {
//   if (removeAccents(a) > removeAccents(b)) return 1;
//   if (removeAccents(a) < removeAccents(b)) return -1;

//   return 0;
// });

// console.log(arr);
