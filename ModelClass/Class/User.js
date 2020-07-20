// Sơ đò lớp của User

const User = class {
  constructor(
    id,
    username,
    password,
    identityCard,
    fullName,
    dob,
    address,
    status
  ) {
    this.id = id || "UnKnown";
    this.username = username || "Unknown";
    this.password = password || "Unknown";
    this.identityCard = identityCard || "Unknown";
    this.fullName = fullName || "Unknown";
    this.dob = dob || "Unknown";
    this.address = address || "Unknown";
    this.status = status || -1;
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
  getAddress() {
    return this.address;
  }
  setAddress(newAddress) {
    this.address = newAddress;
  }
  getStatus() {
    return this.status;
  }
  setStatus(newStatus) {
    this.status = newStatus;
  }
};

module.exports = User;
