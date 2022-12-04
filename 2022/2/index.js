const fs = require("fs");

function program1(lines) { 
  let sum = 0;

  lines.forEach(line => {
    const shown = line.split(" ")
    const opponent  = shown[0];
    const player = shown[1];

    if(player === "X") {
       sum += 1
       if(opponent === "A") {
        sum += 3
       }
       if(opponent === "C") {
        sum += 6
       }
    }
    if(player === "Y") {
      sum += 2
      if(opponent === "A") {
        sum += 6
      }
      if(opponent === "B") {
        sum += 3
      }
    }
    if(player === "Z") {
      sum += 3
      if(opponent === "B") {
      sum += 6
      }
      if(opponent === "C") {
      sum += 3
      }
    }
  })
  return sum;
}

function program2(lines) { 
  let sum = 0;

  lines.forEach(line => {
    const shown = line.split(" ")
    const opponent  = shown[0];

    const needToDo = shown[1];

    if(opponent === "A") {
      if(needToDo === "X") { 
        sum += 3
      }
      if(needToDo === "Y") { 
        sum += 4
      }
      if(needToDo === "Z") { 
        sum += 8
      }
    }
    if(opponent === "B") {
      if(needToDo === "X") { 
        sum += 1
      }
      if(needToDo === "Y") { 
        sum += 5
      }
      if(needToDo === "Z") { 
        sum += 9
      }
    }
    if(opponent === "C") {
      if(needToDo === "X") { 
        sum += 2
      }
       if(needToDo === "Y") { 
        sum += 6
      }
       if(needToDo === "Z") { 
        sum += 7
      }
    }

  })
  return sum
}
fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err)
    return;
  }

  const lines = data.split("\r\n")
  const answer = program1(lines)
  const answer2 = program2(lines)

  console.log({answer, answer2})
})