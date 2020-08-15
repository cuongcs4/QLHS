// Sơ đò lớp của EmployeeTrainingDepartment kế thừa từ Employee.

const ExecuteSQL = require("../Database/ExecuteSQL");
const checkExist = require("../Helper/services/checkExist");
const removeAccents = require("../Helper/services/removeAccents");

const flagClass = require("../Helper/resource/Flag");

const Semester = require("./Semester");
const Class = require("./Class");
const Student = require("./Student");
const RoomExam = require("./RoomExam");
const ExamRoom = require("./RoomExam");
const ResultSurvey = require("./ResultSurvey");
const Score = require("./Score");
const Employee = require("./Employee");
const Room = require("./Room");
const { reset } = require("nodemon");

const EmployeeTrainingDepartment = class extends Employee {
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
    typeUser,
    phoneNumber
  ) {
    super(
      id,
      username,
      password,
      identityCard,
      fullName,
      dob,
      gender,
      address,
      status,
      typeUser,
      phoneNumber
    );
  }

  //Lấy tất cả các lớp đang hoạt động trong nhà trường.
  async getClass() {
    //Câu truy vấn lấy tất cả các lớp học đang hoạt động trong trường.
    const sqlQuery =
      `SELECT LH.malop AS classID, LH.magvcn AS managerClass, GV.hoten AS managerName, LH.namnhaphoc AS course, LH.maphong AS roomID, LH.trangthai AS status ` +
      `FROM LOPHOC AS LH INNER JOIN GIAOVIEN AS GV ON LH.magvcn=GV.magv ` +
      `WHERE LH.trangthai=1`;

    const result = await ExecuteSQL(sqlQuery);
    const latestSemester = await Semester.getLatestSemester();

    //Phân loại lớp học
    const listClass10 = [];
    const listClass11 = [];
    const listClass12 = [];

    for (let i = 0; i < result.length; i++) {
      const itemClass = result[i];
      const course = latestSemester.getYearStart() - itemClass.course + 10;

      switch (course) {
        case 10:
          listClass10.push(itemClass);
          break;

        case 11:
          listClass11.push(itemClass);
          break;

        case 12:
          listClass12.push(itemClass);
          break;
      }
    }

    //Trả về kết quả
    return { listClass10, listClass11, listClass12 };
  }

  //Lấy danh sách học sinh trong lớp học.
  async getStudents(classID) {
    const findClass = await Class.Find(classID);

    return findClass === null ? null : await findClass.getStudentInClass();
  }

  //Lấy thông tin của một học sinh.
  async getStudent(studentID) {
    const result = await Student.Find({ id: studentID, classID: null });

    return result;
  }

  //Lấy thời khóa biểu của lớp học
  async getSchedule(classID, semesterID, yearStart, yearEnd) {
    const sqlQuery =
      `SELECT TKB.ngaytrongtuan AS dayInWeek, TKB.tiet AS startSection, BM.tenbm AS subjectName, GV.hoten AS teacherFullName, GV.magv AS teacherID ` +
      `FROM THOIKHOABIEU AS TKB, BOMON AS BM, GIAOVIEN AS GV ` +
      `WHERE GV.magv=TKB.magv AND TKB.mabm=BM.mabm AND TKB.malop='${classID}' AND TKB.mahk=${semesterID} AND TKB.nambd=${yearStart} AND TKB.namkt=${yearEnd}`;

    const result = await ExecuteSQL(sqlQuery);

    return result;
  }

  //Lấy lịch thi của tất cả các khối theo học kỳ
  async getScheduleExam(semesterID, yearStart, yearEnd) {
    const sqlQuery =
      `SELECT LT.malt AS id, LT.mahk AS semesterID, LT.nambd AS yearStart, LT.namkt AS yearEnd, ` +
      `LT.maphong AS roomID, LT.mabm AS subjectID, LT.ngaythi AS dayExam, ` +
      `LT.tietBD as section, LT.khoi AS class, LT.giamthi1 AS supervisorID1, LT.giamthi2 AS supervisorID2 ` +
      `FROM LICHTHI AS LT ` +
      `WHERE LT.mahk=${semesterID} AND LT.nambd=${yearStart} AND LT.namkt=${yearEnd}`;

    const result = await ExecuteSQL(sqlQuery);

    const listScheduleExam10 = [];
    const listScheduleExam11 = [];
    const listScheduleExam12 = [];

    for (let i = 0; i < result.length; i++) {
      switch (result[i].class) {
        case 10:
          listScheduleExam10.push(result[i]);
          break;

        case 11:
          listScheduleExam11.push(result[i]);
          break;

        case 12:
          listScheduleExam12.push(result[i]);
          break;
      }
    }

    return { listScheduleExam10, listScheduleExam11, listScheduleExam12 };
  }

  //Lấy danh sách các phòng thi
  async getExamRoom(semesterID, yearStart, yearEnd) {
    const result = await ExamRoom.Find(semesterID, yearStart, yearEnd);
    return result;
  }

  //Lấy danh sách học sinh trong phòng thi
  async getStudentExamRoom(examRoomID, semesterID, yearStart, yearEnd) {
    const result = await ExamRoom.GetStudents(
      examRoomID,
      semesterID,
      yearStart,
      yearEnd
    );

    return result;
  }

  //Tạo phòng thi
  async createExamRoom(maxStudent) {
    //1. Lấy tất cả các học sinh
    const { listClass10, listClass11, listClass12 } = await this.getClass();

    //Khối 10 - lấy toàn bộ học sinh
    const listStudent10 = [];
    for (let i = 0; i < listClass10.length; i++) {
      const class10 = await Class.Find(listClass10[i].classID);
      const listStudentInClass = await class10.getStudentInClass();

      for (let j = 0; j < listStudentInClass.length; j++) {
        listStudent10.push(listStudentInClass[j]);
      }
    }
    //Sắp xếp
    listStudent10.sort((a, b) => {
      if (removeAccents(a.fullName) > removeAccents(b.fullName)) return 1;
      if (removeAccents(a.fullName) < removeAccents(b.fullName)) return -1;
      return 0;
    });

    //Khối 11 - lấy toàn bộ học sinh
    const listStudent11 = [];
    for (let i = 0; i < listClass11.length; i++) {
      const class11 = await Class.Find(listClass11[i].classID);
      const listStudentInClass = await class11.getStudentInClass();

      for (let j = 0; j < listStudentInClass.length; j++) {
        listStudent11.push(listStudentInClass[j]);
      }
    }
    //Sắp xếp
    listStudent11.sort((a, b) => {
      if (removeAccents(a.fullName) > removeAccents(b.fullName)) return 1;
      if (removeAccents(a.fullName) < removeAccents(b.fullName)) return -1;
      return 0;
    });

    //Khối 12 - lấy toàn bộ học sinh
    const listStudent12 = [];
    for (let i = 0; i < listClass12.length; i++) {
      const class12 = await Class.Find(listClass12[i].classID);
      const listStudentInClass = await class12.getStudentInClass();

      for (let j = 0; j < listStudentInClass.length; j++) {
        listStudent12.push(listStudentInClass[j]);
      }
    }
    //Sắp xếp
    listStudent12.sort((a, b) => {
      if (removeAccents(a.fullName) > removeAccents(b.fullName)) return 1;
      if (removeAccents(a.fullName) < removeAccents(b.fullName)) return -1;
      return 0;
    });

    //2. Chia phòng thi
    //2.1 Lấy toàn bộ phòng học
    const listRoom = await Room.Find();

    //2.2 Chia theo từng khối.
    const {
      semesterID,
      yearStart,
      yearEnd,
    } = await Semester.getLatestSemester();
    //Khối 10

    let countStudent = 0;
    let countRoomID = 0;

    let sqlQueryInsert = `INSERT INTO PHONGTHI(maphongthi, phonghoc, mahs, mahk, nambd, namkt) VALUES `;
    for (let i = 0; i < listStudent10.length; i++) {
      if (countStudent < maxStudent) {
        if (i !== 0) {
          sqlQueryInsert += `, `;
        }

        const { roomID } = listRoom[countRoomID];
        const { studentID } = listStudent10[i];

        let examRoomID = ~~(i / maxStudent) + 1;
        if (examRoomID < 10) {
          examRoomID = `0${examRoomID}`;
        }

        sqlQueryInsert += `('10${examRoomID}','${roomID}','${studentID}',${semesterID},${yearStart},${yearEnd})`;

        countStudent++;
      } else {
        countStudent = 0;
        countRoomID++;
        if (countRoomID >= listRoom.length) {
          countRoomID = 0;
        }
        i--;
      }
    }

    countStudent = 0;
    countRoomID = 0;

    for (let i = 0; i < listStudent11.length; i++) {
      if (countStudent < maxStudent) {
        const { roomID } = listRoom[countRoomID];
        const { studentID } = listStudent11[i];

        let examRoomID = ~~(i / maxStudent) + 1;
        if (examRoomID < 10) {
          examRoomID = `0${examRoomID}`;
        }

        sqlQueryInsert += `, ('11${examRoomID}','${roomID}','${studentID}',${semesterID},${yearStart},${yearEnd})`;

        countStudent++;
      } else {
        countStudent = 0;
        countRoomID++;
        if (countRoomID >= listRoom.length) {
          countRoomID = 0;
        }
        i--;
      }
    }

    countStudent = 0;
    countRoomID = 0;

    for (let i = 0; i < listStudent12.length; i++) {
      if (countStudent < maxStudent) {
        const { roomID } = listRoom[countRoomID];
        const { studentID } = listStudent12[i];

        let examRoomID = ~~(i / maxStudent) + 1;
        if (examRoomID < 10) {
          examRoomID = `0${examRoomID}`;
        }

        sqlQueryInsert += `, ('12${examRoomID}','${roomID}','${studentID}',${semesterID},${yearStart},${yearEnd})`;

        countStudent++;
      } else {
        countStudent = 0;
        countRoomID++;
        if (countRoomID >= listRoom.length) {
          countRoomID = 0;
        }
        i--;
      }
    }

    await ExecuteSQL(sqlQueryInsert);
  }

  //Lấy điểm số của tất cả các học sinh
  //1. Lấy tất cả các lớp học, chia khối
  //2. Lấy tất cả các học sinh trong lớp, phân loại, tính loại
  async getScore(semesterID, yearStart, yearEnd) {
    //1. Lấy tất cả các lớp học, phân loại
    const class10 = { type1: 0, type2: 0, type3: 0, type4: 0, type5: 0 };
    const class11 = { type1: 0, type2: 0, type3: 0, type4: 0, type5: 0 };
    const class12 = { type1: 0, type2: 0, type3: 0, type4: 0, type5: 0 };

    const { listClass10, listClass11, listClass12 } = await this.getClass();

    //Phân loại lớp 10
    for (let i = 0; i < listClass10.length; i++) {
      const listStudentInClass = await Student.Find({
        id: null,
        classID: listClass10[i].classID,
      });

      if (listStudentInClass === null) break;

      for (let j = 0; j < listStudentInClass.length; j++) {
        const type = await listStudentInClass[j].classifyAverageScore(
          semesterID,
          yearStart,
          yearEnd
        );

        switch (type) {
          case flagClass.SCORE.TYPE_1:
            class10.type1++;
            break;

          case flagClass.SCORE.TYPE_2:
            class10.type2++;
            break;

          case flagClass.SCORE.TYPE_3:
            class10.type3++;
            break;

          case flagClass.SCORE.TYPE_4:
            class10.type4++;
            break;

          case flagClass.SCORE.TYPE_5:
            class10.type5++;
            break;
        }
      }
    }

    //Phân loại lớp 11
    for (let i = 0; i < listClass11.length; i++) {
      const listStudentInClass = await Student.Find({
        id: null,
        classID: listClass11[i].classID,
      });

      if (listStudentInClass === null) break;

      for (let j = 0; j < listStudentInClass.length; j++) {
        const type = await listStudentInClass[j].classifyAverageScore(
          semesterID,
          yearStart,
          yearEnd
        );

        switch (type) {
          case flagClass.SCORE.TYPE_1:
            class11.type1++;
            break;

          case flagClass.SCORE.TYPE_2:
            class11.type2++;
            break;

          case flagClass.SCORE.TYPE_3:
            class11.type3++;
            break;

          case flagClass.SCORE.TYPE_4:
            class11.type4++;
            break;

          case flagClass.SCORE.TYPE_5:
            class11.type5++;
            break;
        }
      }
    }

    //Phân loại lớp 12
    for (let i = 0; i < listClass12.length; i++) {
      const listStudentInClass = await Student.Find({
        id: null,
        classID: listClass12[i].classID,
      });

      if (listStudentInClass === null) break;

      for (let j = 0; j < listStudentInClass.length; j++) {
        const type = await listStudentInClass[j].classifyAverageScore(
          semesterID,
          yearStart,
          yearEnd
        );

        switch (type) {
          case flagClass.SCORE.TYPE_1:
            class12.type1++;
            break;

          case flagClass.SCORE.TYPE_2:
            class12.type2++;
            break;

          case flagClass.SCORE.TYPE_3:
            class12.type3++;
            break;

          case flagClass.SCORE.TYPE_4:
            class12.type4++;
            break;

          case flagClass.SCORE.TYPE_5:
            class12.type5++;
            break;
        }
      }
    }

    return { class10, class11, class12 };
  }

  //Lấy hạnh kiểm của tất cả các học sinh
  async getConduct(semesterID, yearStart, yearEnd) {
    //1. Lấy tất cả các lớp học, phân loại
    const class10 = { type1: 0, type2: 0, type3: 0, type4: 0 };
    const class11 = { type1: 0, type2: 0, type3: 0, type4: 0 };
    const class12 = { type1: 0, type2: 0, type3: 0, type4: 0 };

    const { listClass10, listClass11, listClass12 } = await this.getClass();

    //Phân loại lớp 10
    for (let i = 0; i < listClass10.length; i++) {
      const listStudentInClass = await Student.Find({
        id: null,
        classID: listClass10[i].classID,
      });

      if (listStudentInClass === null) break;

      for (let j = 0; j < listStudentInClass.length; j++) {
        const type = await listStudentInClass[j].getConduct(
          semesterID,
          yearStart,
          yearEnd
        );

        switch (type) {
          case flagClass.CONDUCT.TYPE_1:
            class10.type1++;
            break;

          case flagClass.CONDUCT.TYPE_2:
            class10.type2++;
            break;

          case flagClass.CONDUCT.TYPE_3:
            class10.type3++;
            break;

          case flagClass.CONDUCT.TYPE_4:
            class10.type4++;
            break;
        }
      }
    }

    //Phân loại lớp 11
    for (let i = 0; i < listClass11.length; i++) {
      const listStudentInClass = await Student.Find({
        id: null,
        classID: listClass11[i].classID,
      });

      if (listStudentInClass === null) break;

      for (let j = 0; j < listStudentInClass.length; j++) {
        const type = await listStudentInClass[j].getConduct(
          semesterID,
          yearStart,
          yearEnd
        );

        switch (type) {
          case flagClass.CONDUCT.TYPE_1:
            class11.type1++;
            break;

          case flagClass.CONDUCT.TYPE_2:
            class11.type2++;
            break;

          case flagClass.CONDUCT.TYPE_3:
            class11.type3++;
            break;

          case flagClass.CONDUCT.TYPE_4:
            class11.type4++;
            break;
        }
      }
    }

    //Phân loại lớp 12
    for (let i = 0; i < listClass12.length; i++) {
      const listStudentInClass = await Student.Find({
        id: null,
        classID: listClass12[i].classID,
      });

      if (listStudentInClass === null) break;

      for (let j = 0; j < listStudentInClass.length; j++) {
        const type = await listStudentInClass[j].getConduct(
          semesterID,
          yearStart,
          yearEnd
        );

        switch (type) {
          case flagClass.CONDUCT.TYPE_1:
            class12.type1++;
            break;

          case flagClass.CONDUCT.TYPE_2:
            class12.type2++;
            break;

          case flagClass.CONDUCT.TYPE_3:
            class12.type3++;
            break;

          case flagClass.CONDUCT.TYPE_4:
            class12.type4++;
            break;
        }
      }
    }

    return { class10, class11, class12 };
  }

  static async GetNewEmployeeID() {
    const sqlQuery = `SELECT COUNT(manv) AS total ` + `FROM NHANVIEN`;
    const { total } = (await ExecuteSQL(sqlQuery))[0];
    if (total < 10) return `NV0${total}`;

    return `NV${total}`;
  }

  static async Find(userName) {
    if (typeof userName === "undefined") {
      const sqlQuery =
        `SELECT * ` +
        `FROM NHANVIEN AS NV INNER JOIN NGUOIDUNG AS ND ON NV.manv=ND.tenDangNhap ` +
        `WHERE ND.loai = 4`;

      const result = await ExecuteSQL(sqlQuery);
      if (result.length !== 0) {
        const listEmployees = [];
        for (let i = 0; i < result.length; i++) {
          const employeeOnDB = result[i];

          const id = employeeOnDB.manv;
          const username = employeeOnDB.manv;
          const password = employeeOnDB.matKhau;
          const identityCard = employeeOnDB.cmnd;
          const fullName = employeeOnDB.hoten;
          const dob = new Date(employeeOnDB.ngaysinh);
          const gender = employeeOnDB.gioitinh;
          const address = employeeOnDB.diachi;
          const status = employeeOnDB.trangthai;
          const phoneNumber = employeeOnDB.std;
          const typeUser = employeeOnDB.loai;

          listEmployees.push(
            new EmployeeTrainingDepartment(
              id,
              username,
              password,
              identityCard,
              fullName,
              dob,
              gender,
              address,
              status,
              typeUser,
              phoneNumber
            )
          );
        }

        return listEmployees;
      }
      return null;
    } else {
      const sqlQuery =
        `SELECT * ` +
        `FROM NHANVIEN AS NV INNER JOIN NGUOIDUNG AS ND ON NV.manv=ND.tenDangNhap ` +
        `WHERE NV.manv='${userName}'`;

      const result = await ExecuteSQL(sqlQuery);

      if (result.length === 0) return null;

      const employeeOnDB = result[0];

      const id = employeeOnDB.manv;
      const username = employeeOnDB.manv;
      const password = employeeOnDB.matKhau;
      const identityCard = employeeOnDB.cmnd;
      const fullName = employeeOnDB.hoten;
      const dob = new Date(employeeOnDB.ngaysinh);
      const gender = employeeOnDB.gioitinh;
      const address = employeeOnDB.diachi;
      const status = employeeOnDB.trangthai;
      const phoneNumber = employeeOnDB.std;
      const typeUser = employeeOnDB.loai;

      return new EmployeeTrainingDepartment(
        id,
        username,
        password,
        identityCard,
        fullName,
        dob,
        gender,
        address,
        status,
        typeUser,
        phoneNumber
      );
    }
  }

  static async Save(employee) {
    const isExist = await checkExist(
      "NGUOIDUNG",
      "tenDangNhap",
      employee.username
    );

    const dobFormat = `${employee.dob.getFullYear()}-${
      employee.dob.getMonth() + 1
    }-${employee.dob.getDate()}`;

    if (isExist) {
      //update
      //1. update NGUOIDUNG
      const sqlQuery1 =
        `UPDATE NGUOIDUNG ` +
        `SET matKhau="${employee.getPassWord()}", cmnd='${employee.getIdentityCard()}' ` +
        `WHERE tenDangNhap='${employee.getUserName()}'`;
      await ExecuteSQL(sqlQuery1);

      //2. update GIAOVIEN
      const sqlQuery2 =
        `UPDATE NHANVIEN ` +
        `SET ngaysinh="${dobFormat}", ` +
        `hoten="${employee.getFullName()}", ` +
        `diachi="${employee.getAddress()}", ` +
        `gioitinh="${employee.getGender()}", ` +
        `sdt="${employee.getPhoneNumber()}", ` +
        `trangthai=${employee.getStatus()} ` +
        `WHERE manv="${employee.getUserName()}"`;
      await ExecuteSQL(sqlQuery2);

      return flagClass.DB.UPDATE;
    }
    //insert
    //1. Insert NGUOIDUNG
    const sqlQuery1 =
      `INSERT INTO NGUOIDUNG (tenDangNhap, matKhau, cmnd, loai) ` +
      `VALUES ('${employee.getUserName()}', '${employee.getPassWord()}', '${employee.getIdentityCard()}', ${
        flagClass.TYPE_USER.EMPLOYEE_TRAINING_DEPARTMENT
      })`;

    await ExecuteSQL(sqlQuery1);

    //2. Insert GIAOVIEN
    const sqlQuery2 =
      `INSERT INTO NHANVIEN (manv, ngaysinh, gioitinh, hoten, diachi, sdt, trangthai, maloainv) ` +
      `VALUES ('${employee.getUserName()}', '${dobFormat}', '${employee.getGender()}', '${employee.getFullName()}', '${employee.getAddress()}', '${employee.getPhoneNumber()}', ${employee.getStatus()}, 'GiaoVu')`;

    await ExecuteSQL(sqlQuery2);

    return flagClass.DB.NEW;
  }
};

// const exec = async () => {
//   //const studentID = "HS20190101";
//   const result = await EmployeeTrainingDepartment.getClass();

//   console.log(result);
// };

// exec();

module.exports = EmployeeTrainingDepartment;
