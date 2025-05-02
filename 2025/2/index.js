const fs = require("fs");

function program1(lines) {
  let safeReports = 0;
  let advancedReports = 0;

  lines.forEach((report) => {
    let safetyRule = true;
    let advancedSafetyRule = true;
    const degrees = report.split(" ");
    const numbered = degrees.map((degree) => parseInt(degree, 10));
    let increasing = true;
    if (numbered[0] > numbered[1]) {
      increasing = false;
    }
    numbered.forEach((num, i) => {
      if (i !== numbered.length - 1) {
        const num2 = numbered[i + 1];
        if (increasing && (num >= num2 || num2 - num > 3 || num2 - num < 1)) {
          safetyRule = false;
        } else if (
          !increasing &&
          (num <= num2 || num - num2 > 3 || num - num2 < 1)
        )
          safetyRule = false;
      }
    });
    if (safetyRule) {
      safeReports++;
    } else {
      for (let ind = 0; ind < numbered.length; ind++) {
        const numberedCopy = [...numbered];
        numberedCopy.splice(ind, 1);
        increasing = true;
        if (numberedCopy[0] > numberedCopy[1]) {
          increasing = false;
        }
        console.log({ numberedCopy, numbered });
        numberedCopy.forEach((num, i) => {
          debugger;
          if (i !== numberedCopy.length - 1) {
            const num2 = numberedCopy[i + 1];
            if (
              increasing &&
              (num >= num2 || num2 - num > 3 || num2 - num < 1)
            ) {
              advancedSafetyRule = false;
            } else if (
              !increasing &&
              (num <= num2 || num - num2 > 3 || num - num2 < 1)
            )
              advancedSafetyRule = false;
          }
        });
      }
      if (advancedSafetyRule) advancedReports++;
    }
  });
  console.log({ safeReports, advancedReports });
}

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");
  const answer = program1(lines);
  console.log({ answer });
});
