const studentFormat = {
  filed: {
    A1: "STT",
    B1: "Tên học sinh",
    C1: "Ngày sinh",
    D1: "CMND",
    E1: "Giới tính",
    F1: "Địa chỉ",
  },
  propName: ["id", "fullName", "dob", "identityCard", "gender", "address"],
  width: {
    A1: 5,
    B1: 20,
    C1: 15,
    D1: 15,
    E1: 10,
    F1: 40,
  },
};

const scoreFormat = {
  filed: {
    A1: "STT",
    B1: "Mã học sinh",
    C1: "Họ tên",
    D1: "Giới tính",
    E1: "Cột 1",
    F1: "Cột 2",
    G1: "Cột 3",
    H1: "Cột 4",
  },
  propName: [
    "id",
    "studentId",
    "fullName",
    "gender",
    "score1",
    "score2",
    "score3",
    "score4",
  ],
  width: {
    A1: 5,
    B1: 20,
    C1: 30,
    D1: 10,
    E1: 10,
    F1: 10,
    G1: 10,
    H1: 10,
  },
};

const conductFormat = {
  filed: {
    A1: "STT",
    B1: "Mã học sinh",
    C1: "Họ tên",
    D1: "Giới tính",
    E1: "Xếp loại",
  },
  propName: ["id", "studentId", "fullName", "gender", "grade"],
  width: {
    A1: 5,
    B1: 20,
    C1: 30,
    D1: 10,
    E1: 10,
  },
};

const formatFileExcel = { studentFormat, scoreFormat, conductFormat };

module.exports = formatFileExcel;
