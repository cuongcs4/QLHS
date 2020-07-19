//Sơ đồ lớp của ExamRoom kế thừa từ Room

const Room = require("./Room");

const ExamRoom = class extends Room {
  constructor(roomID, roomName, roomType, semester, students) {
    super(roomID, roomName, roomType);

    this.semester = semester || null;
    this.students = students || null;
  }

  getSemester() {}

  getStudents() {}

  static find() {}

  static save() {}
};

module.exports = ExamRoom;
