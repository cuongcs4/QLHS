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

const compareString = require("./compareString");

const parseFileExcel = (fileName, format) => {
  console.log("parseFileExcel");

  const result = {
    data: [],
    err: [],
  };

  const wb = xlsx.readFile(fileName, { cellDates: true });

  const ws = wb.Sheets[`${wb.SheetNames[0]}`];

  for (let e in format.filed) {
    console.log(e);

    if (!compareString(ws[e].v, format.filed[e])) {
      let string = "";
      Object.keys(format.filed).map((key) => {
        string += `[${format.filed[key]} (${key})]`;
      });
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

    if (typeof item["gender"] != "undefined") {
      item["gender"] =
        compareString(item["gender"], "nam") === true
          ? flagClass.GENDER.MALE
          : flagClass.GENDER.FEMALE;
    }

    listItems.push(item);
  }

  result.data = listItems;

  return result;
};

module.exports = parseFileExcel;

const fileName = "D:/2019_2020/HK2/TKPM/PROJECT/WEB/dshocsinh.xlsx";
const fileScore = "D:/2019_2020/HK2/TKPM/PROJECT/WEB/Điểm 12A1.xlsx";
const fileConduct = "D:/2019_2020/HK2/TKPM/PROJECT/WEB/Hạnh kiểm.xlsx";
//const result = parseFileExcel(fileName, studentFormat);

const result = parseFileExcel(fileScore, scoreFormat);

console.log(result);

if (result.err.length !== 0) {
  console.log(result.err);
} else console.log(result.data);

const str = "Abc";
console.log(str.toLowerCase());
