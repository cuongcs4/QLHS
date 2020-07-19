const createConnection = require("./Connect");

const ExecuteSQL = (sql) => {
  return new Promise((resole, reject) => {
    const connection = createConnection();
    connection.connect((err) => {
      if (err) {
        reject(err);
      }
    });

    connection.query(sql, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resole(results);
    });

    connection.end();
  });
};

module.exports = ExecuteSQL;
