const xlsx = require("xlsx");
const flagClass = require("./Flag");

const studentFormat = {
  filed: {
    A1: "stt",
    B1: "tên học sinh",
    C1: "ngày sinh",
    D1: "cmnd",
    E1: "giới tính",
    F1: "địa chỉ",
  },
  propName: ["id", "fullName", "dob", "identityCard", "gender", "address"],
};

const scoreFormat = {
  filed: {
    A1: "stt",
    B1: "mã học sinh",
    C1: "họ tên",
    D1: "giới tính",
    E1: "cột 1",
    F1: "cột 2",
    G1: "cột 3",
    H1: "cột 4",
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
};

const conductFormat = {
  filed: {
    A1: "stt",
    B1: "mã học sinh",
    C1: "họ tên",
    D1: "giới tính",
    E1: "xếp loại",
  },
  propName: ["id", "studentId", "fullName", "gender", "grade"],
};

const compareString = (string1, string2) => {
  string1 = string1.toLowerCase();
  string2 = string2.toLowerCase();

  //string1 = string2 = "a";
  const arrString1 = string1.split(" ");
  const arrString2 = string2.split(" ");

  if (arrString1.length !== arrString2.length) return false;

  for (let i = 0; i < arrString1.length; i++) {
    if (arrString1[i] != arrString2[i]) return false;
  }

  return true;
};

const parseFileExcel = (fileName, format) => {
  const result = {
    data: [],
    err: [],
  };

  const wb = xlsx.readFile(fileName, { cellDates: true });

  const ws = wb.Sheets[`${wb.SheetNames[0]}`];

  for (let e in format.filed) {
    let string = "";
    Object.keys(format.filed).map((key) => {
      string += `[${format.filed[key]} (${key})]`;
    });

    // console.log(string);

    if (!compareString(ws[e].v, format.filed[e])) {
      result.err.push(
        `Tên cột trong file không chính xác, kiểm tra lại định dạng`
      );
      result.err.push(`Định dạng mẫu: ${string}`);

      return result;
    }
  }

  const data = xlsx.utils.sheet_to_json(ws);

  const listItems = [];

  for (let i = 0; i < data.length; i++) {
    const mapData = Object.keys(data[i]).map((key) => data[i][key]);

    if (mapData.length < format.propName.length) {
      result.err.push("Điền thiếu thông tin");

      return result;
    }

    const item = {};

    for (let j = 0; j < mapData.length; j++) {
      item[`${format.propName[j]}`] = mapData[j];
    }

    if (typeof item.gender != "undefined") {
      item.gender =
        compareString(item.gender, "nam") === true
          ? flagClass.GENDER.MALE
          : flagClass.GENDER.FEMALE;
    }

    listItems.push(item);
  }

  result.data = listItems;

  return result;
};

const fileName = "D:/2019_2020/HK2/TKPM/PROJECT/WEB/dshocsinh.xlsx";
const fileScore = "D:/2019_2020/HK2/TKPM/PROJECT/WEB/Điểm 12A1.xlsx";
const fileConduct = "D:/2019_2020/HK2/TKPM/PROJECT/WEB/Hạnh kiểm.xlsx";
//const result = parseFileExcel(fileName, studentFormat);

const result = parseFileExcel(fileConduct, conductFormat);

//console.log(result);

if (result.err.length !== 0) {
  console.log(result.err);
} else console.log(result.data);
