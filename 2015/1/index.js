const fs = require('fs')


const part1 = (input) => {
  let floors = 0
  input.forEach(floor => floor === ('(') ? floors++ : floors--)
  return floors
}

const part2 = (input) => {
  let floors = 0;
  let i = 0;
  for (const floor of input){ 
    floor === ('(') ? floors++ : floors--;
    if (floors === -1) {
      break;
    };
    i++;
  }

  return i +1;
}

fs.readFile('./input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  // const lines = data.split('\n')
  const input = [...data]

  const answer1 = part1(input);
  const answer2 = part2(input);

  console.log({answer1, answer2})
})