const fs = require("fs");

function counter(a1, a2, b1, b2) {
  for (let i = a1; i <= a2; i++) {
    for (let j = b1; j <= b2; j++) {
      if (i === j) return true;
    }
  }
  return false;
}

function program(lines) {
  let sum = 0;
  let sum2 = 0;
  lines.forEach((line) => {
    const splited = line.split(",");
    const a = splited[0].split("-");
    const b = splited[1].split("-");
    const a1 = Number(a[0]);
    const a2 = Number(a[1]);
    const b1 = Number(b[0]);
    const b2 = Number(b[1]);

    if ((a1 <= b1 && a2 >= b2) || (b1 <= a1 && b2 >= a2)) {
      sum += 1;
    }
    if (counter(a1, a2, b1, b2)) sum2 += 1;
  });
  return { sum, sum2 };
}

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");
  const { sum, sum2 } = program(lines);
  console.log({ sum, sum2 });
});
