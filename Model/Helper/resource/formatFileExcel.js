const studentFormat = {
  filed: {
    A1: "STT",
    B1: "Tên học sinh",
    C1: "Ngày sinh",
    D1: "CMND",
    E1: "Giới tính",
    F1: "Địa chỉ",
    G1: "Họ tên cha",
    H1: "Sđt",
    I1: "Họ tên mẹ",
    J1: "Sđt",
  },
  propName: [
    "id",
    "fullName",
    "dob",
    "identityCard",
    "gender",
    "address",
    "dad",
    "dadPhoneNumber",
    "mom",
    "momPhoneNumber",
  ],
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
  nameSheet: "Điểm",
};

const scoreFormatExport = {
  filed: {
    A1: "STT",
    B1: "Mã học sinh",
    C1: "Họ tên",
    D1: "5'",
    E1: "15'",
    F1: "60'",
    G1: "Cuối kỳ",
    H1: "Trung bình",
  },
  propName: [],
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
  nameSheet: "Điểm",
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
  nameSheet: "Hạnh kiểm",
};

const compositeTranscriptFormat = {
  filed: {
    A1: "STT",
    B1: "Mã học sinh",
    C1: "Họ tên",
    D1: "Ngày sinh",
    E1: "Giới tính",
    F1: "Toán",
    G1: "Vật lý",
    H1: "Hóa học",
    I1: "Sinh học",
    J1: "Tin học",
    K1: "Ngữ văn",
    L1: "Lịch sử",
    M1: "Địa lý",
    N1: "Anh văn",
    O1: "Công dân",
    P1: "Công nghệ",
    Q1: "Thể dục",
    R1: "Quốc phòng",
    S1: "Trung bình",
    T1: "Học lực",
    U1: "Hạnh kiểm",
  },
  propName: [],
  width: {
    A1: 5,
    B1: 20,
    C1: 30,
    D1: 15,
    E1: 15,
    F1: 10,
    G1: 10,
    H1: 10,
    I1: 10,
    J1: 10,
    K1: 10,
    L1: 10,
    M1: 10,
    N1: 10,
    O1: 10,
    P1: 10,
    Q1: 10,
    R1: 10,
    S1: 10,
    T1: 10,
    U1: 10,
  },
  nameSheet: "Điểm tổng kết",
};

const examFormat = {
  filed: {
    A1: "STT",
    B1: "Mã môn",
    C1: "Phòng thi",
    D1: "Ngày thi",
    E1: "Tiết bắt đầu",
    F1: "Giám thị 1",
    G1: "Giám thị 2",
  },
  propName: [
    "id",
    "subjectID",
    "roomID",
    "dayExam",
    "startSection",
    "supervisorID1",
    "supervisorID2",
  ],
};

const studentInExamRoomFormat = {
  filed: {
    A1: "STT",
    B1: "Mã học sinh",
    C1: "Họ tên",
    D1: "Mã lớp",
    E1: "Tên lớp",
    F1: "Ngày sinh",
    G1: "Giới tính",
  },
  propName: [],
  width: {
    A1: 5,
    B1: 20,
    C1: 30,
    D1: 10,
    E1: 10,
    F1: 15,
    G1: 10,
  },

  nameSheet: "DSHS",
};

const reportScoreFormat = {
  filed: {
    A1: "Khối",
    B1: "Giỏi",
    C1: "Khá",
    D1: "TB",
    E1: "Yếu",
    F1: "Kém",
  },
  propName: [],
  width: {
    A1: 20,
    B1: 20,
    C1: 20,
    D1: 20,
    E1: 20,
    F1: 20,
  },

  nameSheet: "Học lực",
};

const reportConductFormat = {
  filed: {
    A1: "Khối",
    B1: "Tốt",
    C1: "Khá",
    D1: "TB",
    E1: "Yếu",
  },
  propName: [],
  width: {
    A1: 20,
    B1: 20,
    C1: 20,
    D1: 20,
    E1: 20,
  },

  nameSheet: "Hạnh kiểm",
};

const surveyFormat = {
  filed: {
    A1: "STT",
    B1: "Câu hỏi",
    C1: "0-25%",
    D1: "25-50%",
    E1: "50-75%",
    F1: "75-100%",
  },
  propName: [],
  width: {
    A1: 10,
    B1: 50,
    C1: 20,
    D1: 20,
    E1: 20,
    F1: 20,
  },

  nameSheet: "Khảo sát",
};

module.exports = {
  studentFormat,
  scoreFormat,
  conductFormat,
  compositeTranscriptFormat,
  scoreFormatExport,
  examFormat,
  studentInExamRoomFormat,
  reportScoreFormat,
  reportConductFormat,
  surveyFormat,
};
