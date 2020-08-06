
const ExecuteSQL = require("../Database/ExecuteSQL");
// Sơ đò lớp của User

const User = class {
  constructor(
    id,
    username,
    password,
    identityCard,
    fullName,
    dob,
    gender,
    address,
    status,
    typeUser
  ) {
    this.id = id || "UnKnown";
    this.username = username || "Unknown";
    this.password = password || "Unknown";
    this.identityCard = identityCard || "Unknown";
    this.fullName = fullName || "Unknown";
    this.dob = dob || "Unknown";
    this.gender = gender;
    this.address = address || "Unknown";
    this.status = status;
    this.typeUser = typeUser;
  }

  getUserName() {
    return this.username;
  }
  getPassWord() {
    return this.password;
  }
  setPassWord(newPassword) {
    this.password = newPassword;
  }
  getID() {
    return this.id;
  }
  getIdentityCard() {
    return this.identityCard;
  }
  getFullName() {
    return this.fullName;
  }
  setFullName(newFullName) {
    this.fullName = newFullName;
  }
  getDoB() {
    return this.dob;
  }
  setDob(newDoB) {
    this.dob = newDoB;
  }
  getGender() {
    return this.gender;
  }
  setGender(newGender) {
    this.gender = newGender;
  }
  getAddress() {
    return this.address;
  }
  setAddress(newAddress) {
    this.address = newAddress;
  }
  setIdentityCard(newIdentityCard) {
    this.identityCard = newIdentityCard;
  }
  getStatus() {
    return this.status;
  }
  setStatus(newStatus) {
    this.status = newStatus;
  }

  getTypeUser() {
    return this.typeUser;
  }
  static async Changepassword(user) {
    const sqlQuery1 =
        `UPDATE NGUOIDUNG ` +
        `SET matKhau="${user.getPassWord()}" ` +
        `WHERE tenDangNhap='${user.getUserName()}'`;
    await ExecuteSQL(sqlQuery1);
  }
  
  static async Find(username){
    const sqlQuery =
      `SELECT * ` +
      `FROM NGUOIDUNG AS ND ` +
      `WHERE ND.tenDangNhap='${username}'`;

    const result = await ExecuteSQL(sqlQuery);

    if (result.length === 0) return null;

    const user = result[0];
    const id = user.tenDangNhap;
    const userName = user.tenDangNhap;
    const password = user.matKhau;

    return new User(
      id,
      userName,
      password
    );
  }
};

module.exports = User;
