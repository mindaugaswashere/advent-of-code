const fs = require("fs");

function getI(letter) {
  const alphabet = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet.indexOf(letter);
}

function findSameLetter(first, second) {
  const arr = [];
  for (let letter of first) {
    const cond = second.includes(letter);
    if (cond > 0) {
      return letter;
    }
  }

  return " ";
}

function program1(lines) {
  let sum = 0;
  lines.forEach((line) => {
    const first = line.substr(0, line.length / 2);
    const second = line.substr(line.length / 2, line.length);
    const letter = findSameLetter(first, second);

    sum += getI(letter);
  });
  return sum;
}

function formGroups(lines) {
  const groups = [];
  for (let [i, line] of lines.entries()) {
    if ((i + 1) % 3 == 0) {
      groups.push([lines[i - 2], lines[i - 1], lines[i]]);
    }
  }
  return groups;
}

function findBadge(group) {
  for (letter of group[0]) {
    if (group[1].includes(letter) && group[2].includes(letter)) {
      return letter;
    }
  }
}
function program2(lines) {
  let sum = 0;
  const groups = formGroups(lines);
  groups.forEach((group) => {
    const letter = findBadge(group);
    sum += getI(letter);
  });

  return sum;
}

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");
  const answer = program1(lines);
  const answer2 = program2(lines);

  console.log({ answer, answer2 });
});
