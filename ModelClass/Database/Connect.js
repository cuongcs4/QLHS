const mysql = require("mysql");

require("dotenv").config();

//Các thông tin cần để đăng nhập khi kết nối với csdl
// const host = process.env.HOST;
// const port = process.env.PORT_DATABASE;
// const user = process.env.USER_DATABASE;
// const password = process.env.PASSWORD_DATABASE;
// const database = process.env.NAME_DATABASE;

const host = "localhost";
const port = 3306;
const user = "admin";
const password = "admin";
const database = "qlhs";

// Kết nối với cơ sở dữ liệu
const createConnection = () => {
  return mysql.createConnection({ host, port, user, password, database });
};

module.exports = createConnection;
