import fs from "fs";

function program1(lines: string[]) {
  let current = 50;
  let puzzle = 0;
  lines.forEach((line) => {
    const [isLeft, value] = lineParser(line);
    if (isLeft) {
      for (let i = 0; i < value; i++) {
        current--;
        if (current === -1) current = 99;
      }
    } else {
      for (let i = 0; i < value; i++) {
        current++;
        if (current === 100) current = 0;
      }
    }
    if (current === 0) puzzle++;
  });
  return puzzle;
}

function program2(lines: string[]) {
  let current = 50;
  let puzzle = 0;
  lines.forEach((line) => {
    const [isLeft, value] = lineParser(line);
    if (isLeft) {
      for (let i = 0; i < value; i++) {
        current--;
        if (current === -1) current = 99;
        if (current === 0) puzzle++;
      }
    } else {
      for (let i = 0; i < value; i++) {
        current++;
        if (current === 100) current = 0;
        if (current === 0) puzzle++;
      }
    }
  });
  return puzzle;
}

const lineParser = (line: string): [boolean, number] => {
  let isLeft = false;
  if (line.startsWith("L")) {
    isLeft = true;
    const num = parseInt(line.split("L").join(""));
    return [isLeft, num];
  } else {
    const num = parseInt(line.split("R").join(""));
    return [isLeft, num];
  }
};

fs.readFile("./input.txt", "utf8", (err: any, data: string) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");
  const answer = program1(lines);
  const answer2 = program2(lines);

  console.log({ answer, answer2 });
});
