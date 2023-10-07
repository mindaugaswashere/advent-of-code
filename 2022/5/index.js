const fs = require("fs");

function reformStack(columnArray) {
  let max = 0;
  columnArray.forEach((column) => {
    if (column.length > max) max = column.length - 1;
  });

  const rowArray = [];
  console.log({ rowArray, columnArray });

  for (let i = max; i >= 0; i--) {
    columnArray.forEach((column, index) => {
      const letter = column[column.length - 1];
      if (letter != "" && letter != undefined) {
        if (rowArray[i] == undefined) rowArray[i] = letter;
        else rowArray[i] = rowArray[i] + letter;
        columnArray[index] = columnArray[index].slice(0, -1);
      }
    });
  }
  const newStack = rowArray.map((row) => {
    let string = "";
    for (let i = 0; i < max; i++) {
      string = `${string}${string.length > 0 ? " " : ""}${
        row[i] ? `[${row[i]}]` : "    "
      }`;
    }
    return string;
  });
  console.log({ newStack });
}

function move(instruction, stack) {
  console.log({ stack });
  const indexFrom = instruction.indexOf("from");
  const indexTo = instruction.indexOf("to");
  const move = Number(instruction.slice(5, indexFrom - 1));
  const from = Number(instruction.slice(indexFrom + 5, indexTo - 1) - 1);
  const to = Number(instruction.slice(indexTo + 3) - 1);

  let columnArray = [];
  stack.forEach((row) => {
    let columnCounter = 0;
    for (let i = 0; i < row.length; i += 4) {
      if (row.charAt(i) === "[") {
        if (columnArray[columnCounter] == undefined)
          columnArray[columnCounter] = row[i + 1];
        else columnArray[columnCounter] += row[i + 1];
      }
      columnCounter++;
    }
    columnCounter = 0;
  });

  const movedLetters = columnArray[from].slice(0, move);
  columnArray[from] = columnArray[from].slice(move);
  columnArray[to] = movedLetters + columnArray[to];

  return reformStack(columnArray);
}

function program(lines) {
  const stackArray = [];
  const instructionArray = [];

  lines.forEach((line) => {
    if (line.startsWith("move")) {
      instructionArray.push(line);
    } else stackArray.push(line);
  });
  stackArray.splice(-2);

  let updatedStack = [...stackArray];

  instructionArray.forEach((instruction) => {
    updatedStack = move(instruction, updatedStack);
  });
}

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");
  program(lines);
});
