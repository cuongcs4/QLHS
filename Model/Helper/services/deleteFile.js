const fs = require("fs");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const deleteFile = async (path, time) => {
  //time = time || 1000 * 60 * 5;

  time = time || 1000 * 60 * 5;

  await sleep(time);

  try {
    fs.unlinkSync(path);
    //console.log("remove success");
    //file removed
  } catch (err) {
    console.error(err);
  }

  //console.log("deleted file");
};

module.exports = deleteFile;
