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
  prop: {
    stt: "id",
    "tên học sinh": "fullName",
    "ngày sinh": "dob",
    cmnd: "identityCard",
    "giới tính": "gender",
    "địa chỉ": "address",
  },
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

const parseFileExcelForStudent = (fileName) => {
  const wb = xlsx.readFile(fileName, { cellDates: true });

  const ws = wb.Sheets[`${wb.SheetNames[0]}`];

  for (let e in studentFormat.filed) {
    if (!compareString(ws[e].v, studentFormat.filed[e])) return null;
  }

  const data = xlsx.utils.sheet_to_json(ws);

  const listStudent = [];

  for (let i = 0; i < data.length; i++) {
    const result = Object.keys(data[i]).map((key) => data[i][key]);

    const item = {
      id: result[0],
      fullName: result[1],
      dob: new Date(result[2]),
      identityCard: `${result[3]}`,
      gender:
        compareString(result[4], "nam") === true
          ? flagClass.GENDER.MALE
          : flagClass.GENDER.FEMALE,
      address: result[5],
    };

    listStudent.push(item);
  }

  console.log(listStudent);

  return listStudent;
};

const fileName = "D:/2019_2020/HK2/TKPM/PROJECT/WEB/dshocsinh.xlsx";

parseFileExcelForStudent(fileName);
