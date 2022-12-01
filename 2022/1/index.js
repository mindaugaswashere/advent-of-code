const fs = require("fs");

const processData = (data) => {
  let sum = 0;
  let sumArray = [];
  data.forEach((line) => {
    if (!line) {
      const returnValue = sum;
      sum = 0;
      sumArray.push(returnValue);
    }
    sum += Number(line);
  });
  const max = Math.max(...sumArray);

  let tempMax = max;
  let top3 = max;

  for (let i = 0; i < 2; i++) {
    const index = sumArray.indexOf(tempMax);
    sumArray.splice(index, 1);
    tempMax = Math.max(...sumArray);
    top3 += tempMax;
  }

  console.log({ first: max, second: top3 });
};

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = data.split("\n");
  processData(lines);
});
