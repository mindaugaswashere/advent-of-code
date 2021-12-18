const fs = require('fs')

const sum1 = (lines) => {
  let result = 0;
  for (let i = 1; i <= lines.length - 2; i++) {
    const j = i - 1;
    const a = lines[j]
    const b = lines[i]
    if (b > a) { 
      result++
    }
  } 
  return result;
}

const sum3 = (lines) => {
  let result = 0;
  for (let i = 0; i <= lines.length - 5; i++) {
    const a = parseInt(lines[i], 10)
    const b = parseInt(lines[i + 1], 10)
    const c = parseInt(lines[i + 2], 10)
    const d = parseInt(lines[i + 3], 10)

    const sum1 = a + b + c;
    const sum2 = b + c + d;

    if (sum2 > sum1) {
      result++
    }
  } 
  return result;
}

fs.readFile('./input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const lines = data.split('\n');
  const res1 = sum1(lines)
  const res2 = sum3(lines)

  console.log({res1, res2})
})