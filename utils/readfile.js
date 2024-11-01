const fs = require("fs");

const readFile = async (file) => {
  return new Promise((resolve, reject) => {
    console.log("");
    fs.readFile(file, "utf8", function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

module.exports = readFile;
