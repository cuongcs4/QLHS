const ExecuteSQL = require("../Database/ExecuteSQL");

const checkExist = async (table, field, condition) => {
  const sqlQuery = `SELECT * FROM ${table} WHERE ${field}="${condition}"`;

  const result = await ExecuteSQL(sqlQuery);

  if (result.length !== 0) return true;
  return false;
};

module.exports = checkExist;
