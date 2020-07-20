const Execute = require("../Database/ExecuteSQL");

const getUserByUsername = async (username) => {
  return { id: "admin", username: "admin", password: "admin" };
};

module.exports = getUserByUsername;
