const fs = require("fs");

const prog1 = (data) => {
  let niceCount = 0;
  const forbidden = ["ab", "cd", "pq", "xy"];
  const wovel = ["a", "e", "i", "o", "u"];
  data.forEach((word) => {
    let wovelCount = 0;
    let twice = false;
    let isForbidden = false;
    let index = 0;
    for (key of word) {
      if (wovel.find((entry) => entry === key)) {
        wovelCount++;
      }
      if (index > 0) {
        if (key == word[index - 1]) twice = true;
      }
      forbidden.forEach((entry) => {
        if (word.includes(entry)) {
          isForbidden = true;
        }
      });
      index++;
    }
    if (wovelCount >= 3 && twice && !isForbidden) {
      console.log("nice");
      niceCount++;
    } else console.log("naughty");
  });

  return niceCount;
};

const prog2 = (data) => {
  let niceCount = 0;
  data.forEach((word) => {
    let index = 0;
    let includesPair = false;
    let includesMid = false;
    let pair = "";
    let mids = "";

    for (key of word) {
      let wordCopy = word;
      if (index >= 1) {
        const comparableSymbols = wordCopy[index - 1] + wordCopy[index];
        wordCopy = wordCopy.replace(comparableSymbols, "__");
        if (wordCopy.includes(comparableSymbols)) {
          pair = comparableSymbols;
          includesPair = true;
        }
      }
      if (index >= 2) {
        const side1 = word[index - 2];
        const mid = word[index - 1];
        const side2 = word[index];
        if (side1 === side2) {
          mids = side1 + mid + side2;
          includesMid = true;
        }
      }
      index++;
    }
    if (includesPair && includesMid) {
      console.log({ word, pair, mids });
      niceCount++;
    }
  });

  return niceCount;
};

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const words = data.split("\n");
  const niceCount1 = prog1(words);
  const niceCount2 = prog2(words);

  console.log({ niceCount1, niceCount2 });
});
