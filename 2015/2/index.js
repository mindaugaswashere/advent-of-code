const fs = require("fs");

const prog = (lines) => {
  let area = 0;
  let ribbon = 0;
  lines.forEach((line) => {
    const [height, width, length] = line.split("x");
    const area1 = height * width;
    const area2 = height * length;
    const area3 = length * width;
    const additional = Math.min(area1, area2, area3);
    let [x, y] = [height, width, length].sort((a, b) => a - b).slice(0, 2);
    const bond = height * width * length;
    debugger;
    ribbon += Number(x) + Number(x) + Number(y) + Number(y) + bond * 1;
    area += 2 * (area1 + area2 + area3) + additional;
    console.log({ height, width, length }, { x, y });
  });
  return [area, ribbon];
};

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = data.split("\n");
  const [answer1, answer2] = prog(lines);
  console.log({ answer1, answer2 });
});
