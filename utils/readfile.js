const fs = require("fs");

const readFile = async (file) => {
  console.log("Reading from file");
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

module.exports = readFile;
