const excel = require("excel4node");
const path = require("path");
const flagClass = require("../resource/Flag");

const generateGUID = require("../../Helper/services/generateGUID");

const fileScore = "D:/2019_2020/HK2/TKPM/PROJECT/WEB/Điểm 12A1.xlsx";
const fileConduct = "D:/2019_2020/HK2/TKPM/PROJECT/WEB/hạnh kiểm.xlsx";

const parseFileExcel = require("./parseFileExcel");
const formatFileExcel = require("../resource/formatFileExcel");

const process = require("process");

const exportFileExcel = async (data, format, data2, format2) => {
  // Create a new instance of a Workbook class
  const workbook = new excel.Workbook({ dateFormat: "mm/dd/yyyy" });

  // Add Worksheets to the workbook
  const worksheet = workbook.addWorksheet(`${format.nameSheet}`);

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

  if (typeof data2 !== "undefined" && typeof format2 !== "undefined") {
    const worksheet2 = workbook.addWorksheet(`${format2.nameSheet}`);

    // Tạo tiêu đề
    const formatArray2 = Object.keys(format2.filed).map((key) => {
      return { name: format2.filed[key], width: format2.width[key] };
    });

    for (let i = 0; i < formatArray2.length; i++) {
      worksheet2.column(i + 1).setWidth(formatArray2[i]["width"]);

      //console.log(formatArray2[i]);
      worksheet2
        .cell(1, i + 1)
        .string(formatArray2[i]["name"])
        .style(styleFieldName);
    }

    for (let i = 0; i < data2.length; i++) {
      const mapData2 = Object.keys(data2[i]).map((key) => {
        if (key === "gender")
          return data2[i][key] === flagClass.GENDER.MALE ? "nam" : "nữ";
        return data2[i][key];
      });

      for (let j = 0; j < mapData2.length; j++) {
        switch (typeof mapData2[j]) {
          case "number":
            worksheet2
              .cell(i + 2, j + 1)
              .number(mapData2[j])
              .style(styleData);
            break;

          case "string":
            worksheet2
              .cell(i + 2, j + 1)
              .string(mapData2[j])
              .style(styleData);
            break;

          case "object":
            worksheet2
              .cell(i + 2, j + 1)
              .date(mapData2[j])
              .style(styleData);
            break;
        }
      }
    }
  }

  const fileName = generateGUID();

  workbook.write(`./public/${fileName}.xlsx`);

  //Chờ trong 100ms để đảm bảo file đã được ghi xong
  await new Promise((resolve) => setTimeout(resolve, 500));

  return `./public/${fileName}.xlsx`;
};

module.exports = exportFileExcel;

// const fileName = "D:/2019_2020/HK2/TKPM/PROJECT/WEB/dshocsinh.xlsx";
// const data = parseFileExcel(fileName, formatFileExcel.studentFormat);
// console.log(data);

// exportFileExcel("data1", data.data, formatFileExcel.studentFormat);

// const date = new Date();

// console.log(typeof date);

//const date = new Date();
