const fs = require('fs')

const position = (lines) => {
  let vertical = 0;
  let horizontal = 0;
  console.log({lines})

  lines.forEach(line => {
    const num = line.split(' ')
    const number = parseInt(num[1], 10);

      if (line.search('forward') >= 0) {
      horizontal += number;
    }
    if (line.search('down') >= 0) {
      vertical += number;
    }
    if (line.search('up') >= 0) {
      vertical -= number;
    }
  });
  const multiply = vertical * horizontal;
  return multiply
}

const aim = (lines) => {
  let vertical = 0;
  let horizontal = 0;
  let aim = 0;


  lines.forEach(line => {
    const num = line.split(' ')
    const x = parseInt(num[1], 10);

    if (line.search('forward') >= 0) {
      horizontal += x;
      vertical += aim * x;
    }
    if (line.search('down') >= 0) {
      // vertical += x;
      aim += x;

    }
    if (line.search('up') >= 0) {
      // vertical -= x;
      aim -= x;
    }
    console.log({vertical, horizontal, aim})
  });

  const multiply = vertical * horizontal;
  return multiply
}

fs.readFile('./input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const lines = data.split('\n')
  const res1 = position(lines)
  const res2 = aim(lines)

  console.log({res2})
})