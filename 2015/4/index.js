const fs = require("fs");
var md5 = require("md5");

const prog = (key) => {
  x = true;
  let answer1 = 0;
  while (x) {
    answer1++;
    const hash = key + answer1;
    const hashVal = md5(hash);
    if (hashVal.substring(0, 5) === "00000") {
      x = false;
    }
  }

  let y = true;
  let answer2 = 0;
  while (y) {
    answer2++;
    const hash = key + answer2;
    const hashVal = md5(hash);
    if (hashVal.substring(0, 6) === "000000") {
      y = false;
    }
  }

  return { answer1, answer2 };
};

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const { answer1, answer2 } = prog(data);
  console.log({ answer1, answer2 });
});
