const fs = require("fs").promises;

const readAndProcessFile = async (file) => {
  const data = await fs.readFile(file, "utf8");
  return data.replace(/\r/g, '').split("\n");
};

module.exports = readAndProcessFile;