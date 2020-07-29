const excel = require("excel4node");
const path = require("path");
const flagClass = require("./Flag");

const fileScore = "D:/2019_2020/HK2/TKPM/PROJECT/WEB/Điểm 12A1.xlsx";
const fileConduct = "D:/2019_2020/HK2/TKPM/PROJECT/WEB/hạnh kiểm.xlsx";

const parseFileExcel = require("./parseFileExcel");
const formatFileExcel = require("./formatFileExcel");

const exportFileExcel = (fileName, data, format) => {
  // Create a new instance of a Workbook class
  const workbook = new excel.Workbook({ dateFormat: "mm/dd/yyyy" });

  // Add Worksheets to the workbook
  const worksheet = workbook.addWorksheet("Sheet 1");

  // Create a reusable style
  const styleFieldName = workbook.createStyle({
    alignment: {
      horizontal: "center",
    },
    border: {
      left: {
        style: "medium",
        color: "black",
      },
      right: {
        style: "medium",
        color: "black",
      },
      top: {
        style: "medium",
        color: "black",
      },
      bottom: {
        style: "medium",
        color: "black",
      },
    },
    font: {
      color: "white",
      size: 12,
      background: "black",
    },
    fill: {
      type: "pattern",
      patternType: "solid",
      fgColor: "black",
    },
  });

  const styleData = workbook.createStyle({
    alignment: {
      horizontal: "center",
    },
    border: {
      left: {
        style: "medium", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
        color: "black",
      },
      right: {
        style: "medium",
        color: "black",
      },
      top: {
        style: "medium",
        color: "black",
      },
      bottom: {
        style: "medium",
        color: "black",
      },
    },
  });

  // Tạo tiêu đề
  const formatArray = Object.keys(format.filed).map((key) => {
    return { name: format.filed[key], width: format.width[key] };
  });

  for (let i = 0; i < formatArray.length; i++) {
    worksheet.column(i + 1).setWidth(formatArray[i]["width"]);

    //console.log(formatArray[i]);
    worksheet
      .cell(1, i + 1)
      .string(formatArray[i]["name"])
      .style(styleFieldName);
  }

  for (let i = 0; i < data.length; i++) {
    const mapData = Object.keys(data[i]).map((key) => {
      if (key === "gender")
        return data[i][key] === flagClass.GENDER.MALE ? "nam" : "nữ";
      return data[i][key];
    });

    for (let j = 0; j < mapData.length; j++) {
      switch (typeof mapData[j]) {
        case "number":
          worksheet
            .cell(i + 2, j + 1)
            .number(mapData[j])
            .style(styleData);
          break;

        case "string":
          worksheet
            .cell(i + 2, j + 1)
            .string(mapData[j])
            .style(styleData);
          break;

        case "object":
          worksheet
            .cell(i + 2, j + 1)
            .date(mapData[j])
            .style(styleData);
          break;
      }
    }
  }

  workbook.write(`${path.join(__dirname, "data")}\\${fileName}.xlsx`);

  return `${path.join(__dirname, "data")}\\${fileName}.xlsx`;
};

module.exports = exportFileExcel;
const fileName = "D:/2019_2020/HK2/TKPM/PROJECT/WEB/dshocsinh.xlsx";
const data = parseFileExcel(fileName, formatFileExcel.studentFormat);
console.log(data);

exportFileExcel("data", data.data, formatFileExcel.studentFormat);

// const date = new Date();

// console.log(typeof date);

//const date = new Date();
