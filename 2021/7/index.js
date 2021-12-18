const fs = require('fs')

const doPart1 = (positions) => {
  const positionArr = positions.map(pos => parseInt(pos, 10))
  let minimumFuel = Number.MAX_SAFE_INTEGER;
  let minimumPosition;
  const min = Math.min(...positionArr);
  const max = Math.max(...positionArr);

  for(let i = min; i < max; i++) {
    let currentFuel = 0;
    for(position of positionArr) {
      currentFuel += Math.abs(parseInt(position, 10) - i)
    }
    if(currentFuel < minimumFuel) {
      minimumFuel = currentFuel;
      minimumPosition = i;
    }
  }
  return minimumFuel 
}


const doPart2 = (positions) => {
  const getIncreasingFuel = (pathCount) => {
    let fuelUsed = 0;
    for(let i = 1; i <= pathCount; i++) {
      fuelUsed+=i
    }
    return fuelUsed
  }
  const positionArr = positions.map(pos => parseInt(pos, 10))
  let minimumFuel = Number.MAX_SAFE_INTEGER;
  let minimumPosition;
  const min = Math.min(...positionArr);
  const max = Math.max(...positionArr);

  for(let i = min; i < max; i++) {
    let currentFuel = 0;
    for(position of positionArr) {
      const increasingFuel = getIncreasingFuel(Math.abs(position - i))
      currentFuel += increasingFuel
    }
    if(currentFuel < minimumFuel) {
      minimumFuel = currentFuel;
      minimumPosition = i;
    }
  }
  return minimumFuel 
}

fs.readFile('./input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const elements = data.split(',')
  const part1 = doPart1(elements)
  const part2 = doPart2(elements)

  console.log({part1, part2})
})

