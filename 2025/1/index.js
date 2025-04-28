const fs = require("fs");

function program2(lines) {
  const listA = [];
  const listB = [];

  let sum = 0;

  lines.forEach((line) => {
    const [a, b] = line.split("   ");
    listA.push(parseInt(a, 10));
    listB.push(parseInt(b, 10));
  });

  let minA = 1000000;
  let maxA = 1;

  listA.forEach((a) => {
    if (a <= minA) {
      minA = a;
    }
    if (a >= maxA) {
      maxA = a;
    }
  });

  for (elA of listA) {
    let timesFound = 0;
    listB.forEach((elB) => {
      if (elA === elB) timesFound++;
    });
    sum += elA * timesFound;
  }

  return sum;
}

function program1(lines) {
  const listA = [];
  const listB = [];

  let sum = 0;

  lines.forEach((line) => {
    const [a, b] = line.split("   ");
    listA.push(parseInt(a, 10));
    listB.push(parseInt(b, 10));
  });

  while (listA.length > 0) {
    let minA = 1000000;
    let minB = 1000000;
    listA.forEach((a) => {
      if (a < minA) {
        minA = a;
      }
    });

    listB.forEach((b) => {
      if (b < minB) {
        minB = b;
      }
    });

    const indexA = listA.indexOf(minA);
    const indexB = listB.indexOf(minB);

    listA.splice(indexA, 1);
    listB.splice(indexB, 1);

    if (minB > minA) {
      sum += minB - minA;
    } else sum += minA - minB;
  }

  return sum;
}

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");
  console.log({ lines });
  const answer = program1(lines);
  const answer2 = program2(lines);
  console.log({ answer, answer2 });
});
