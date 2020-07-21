//Sơ đồ lớp của Room

const ExecuteSQL = require("../Database/ExecuteSQL");
const checkExist = require("../MiniServices/checkExist");
const flagClass = require("../MiniServices/Flag");

const Room = class {
  constructor(roomID, roomName, roomType) {
    this.roomID = roomID || null;
    this.roomName = roomName || null;
    this.roomType = roomType || null;
  }

  getRoomID() {
    return this.roomID;
  }

  getRoomName() {
    return this.roomName;
  }

  getRoomType() {
    return this.roomType;
  }

  static async Find(roomID) {
    const sqlQuery = `SELECT * FROM PHONGHOC WHERE maphong='${roomID}'`;
    const result = await ExecuteSQL(sqlQuery);

    if (result.length !== 0) {
      const roomID = result[0].maphong;
      const roomName = result[0].tenphong;
      const roomType = result[0].loaiphong;

      return new Room(roomID, roomName, roomType);
    }

    return null;
  }

  static async Save(room) {
    const isExist = await checkExist("PHONGHOC", "maphong", subject.subjectID);

    if (isExist) {
      //update
      const sqlQuery = `UPDATE PHONGHOC SET tenphong="${room.getRoomName()}", loaiphong="${room.getRoomType()}" WHERE maphong='${room.getRoomID()}'`;
      await ExecuteSQL(sqlQuery);

      return flagClass.DB.UPDATE;
    }

    //insert
    const sqlQuery =
      `INSERT INTO PHONGHOC (maphong, tenphong, loaiphong) ` +
      `VALUES ('${room.getRoomID()}', '${room.getRoomName()}', '${room.getRoomType()}'`;
    await ExecuteSQL(sqlQuery);

    return flagClass.DB.NEW;
  }
};

module.exports = Room;
