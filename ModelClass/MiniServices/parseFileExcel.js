const xlsx = require("xlsx");
const flagClass = require("./Flag");
const compareString = require("./compareString");

const parseFileExcel = (fileName, format) => {
  const result = {
    data: [],
    err: [],
  };

  try {
    const wb = xlsx.readFile(fileName, {
      cellDates: true,
      dateFormat: "dd/mm/yyyy",
    });

    const ws = wb.Sheets[`${wb.SheetNames[0]}`];

    for (let e in format.filed) {
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

      //Lòng vòng như Hải Phòng -_-
      if (typeof item["dob"] != "undefined") {
        const date = new Date(item["dob"]);
        item["dob"] = new Date(date.setDate(date.getDate() + 1));
      }

      listItems.push(item);
    }

    result.data = listItems;
  } catch {
    result.err.push(
      "Lỗi! File không đúng định dạng là file excel (.xlsx) hoặc định dạng mẫu."
    );
    let string = "";
    Object.keys(format.filed).map((key) => {
      string += `[${format.filed[key]} (${key})]`;
    });
    result.err.push(`Định dạng mẫu: ${string}.`);
  }
  return result;
};

module.exports = parseFileExcel;

// const fileName = "D:/2019_2020/HK2/TKPM/PROJECT/WEB/dshocsinh.xlsx";
// const fileScore = "D:/2019_2020/HK2/TKPM/PROJECT/WEB/Điểm 12A1.xlsx";
// const fileConduct = "D:/2019_2020/HK2/TKPM/PROJECT/WEB/Hạnh kiểm.xlsx";
// //const result = parseFileExcel(fileName, studentFormat);

// const result = parseFileExcel(fileScore, scoreFormat);

// console.log(result);

// if (result.err.length !== 0) {
//   console.log(result.err);
// } else console.log(result.data);

// const str = "Abc";
// console.log(str.toLowerCase());
