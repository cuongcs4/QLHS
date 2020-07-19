//Sơ đồ lớp của Room

const Room = class {
  constructor(roomID, roomName, roomType) {
    this.roomID = roomID || null;
    this.roomName = roomName || null;
    this.roomType = roomType || null;
  }

  getRoomID() {}

  getRoomName() {}

  getRoomType() {}

  static find() {}

  static save() {}
};

module.exports = Room;
