const fs = require("fs").promises;

(async (filePath) => {
  const data = await readAndProcessFile(filePath);
  const answer1 = calculateDifference(data);
  const answer2 = calculateEncodedDifference(data);
  console.log({ answer1, answer2 });
})("./input.txt");

async function readAndProcessFile(file) {
  const data = await fs.readFile(file, "utf8");
  return data.split("\n").filter((line) => line.trim() !== "");
}

function calculateDifference(data) {
  let codeCount = 0;
  let memoryCount = 0;

  data.forEach((row) => {
    codeCount += row.length;
    let stripped = row.slice(1, -1);
    let memoryLength = 0;

    for (let i = 0; i < stripped.length; i++) {
      if (stripped[i] === "\\" && stripped[i + 1] === "x") {
        memoryLength++;
        i += 3;
      } else if (stripped[i] === "\\" && stripped[i + 1] === "\\") {
        memoryLength++;
        i++;
      } else if (stripped[i] === "\\" && stripped[i + 1] === '"') {
        memoryLength++;
        i++;
      } else {
        memoryLength++;
      }
    }

    memoryCount += memoryLength;
  });

  return codeCount - memoryCount;
}

function calculateEncodedDifference(data) {
  let codeCount = 0;
  let encodedCount = 0;

  data.forEach((row) => {
    codeCount += row.length;
    let encoded = row.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

    encoded = `"${encoded}"`;
    encodedCount += encoded.length;
  });

  return encodedCount - codeCount;
}
