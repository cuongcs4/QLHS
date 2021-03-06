//Sơ đồ lớp của Room

const ExecuteSQL = require("../Database/ExecuteSQL");
const checkExist = require("../Helper/services/checkExist");

const flagClass = require("../Helper/resource/Flag");

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
    if (typeof roomID !== "undefined") {
      const sqlQuery = `SELECT * FROM PHONGHOC WHERE maphong='${roomID}'`;
      const result = await ExecuteSQL(sqlQuery);

      if (result.length !== 0) {
        const roomID = result[0].maphong;
        const roomName = result[0].tenphong;
        const roomType = result[0].loaiphong;

        return new Room(roomID, roomName, roomType);
      }

      return null;
    } else {
      const sqlQuery = `SELECT * FROM PHONGHOC`;
      const result = await ExecuteSQL(sqlQuery);

      if (result.length !== 0) {
        const listRoom = [];

        for (let i = 0; i < result.length; i++) {
          const roomID = result[i].maphong;
          const roomName = result[i].tenphong;
          const roomType = result[i].loaiphong;

          listRoom.push(new Room(roomID, roomName, roomType));
        }

        return listRoom;
      }

      return null;
    }
  }
};

module.exports = Room;
