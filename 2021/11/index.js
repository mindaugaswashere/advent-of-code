const fs = require('fs')

const isLeftAvailable = (width) => {
  if(width != 0) return true
  return false
}

const isTopAvailable = (height) => {
  if(height != 0) return true
  return false
}

const isRightAvailable = (width, maxWidth) => {
  if (width != maxWidth - 1) return true;
  return false;
}

const isBottomAvailable = (height, maxWidth) => {
  if(height != maxWidth -1) return true
  return false
}

const clear = (mutable) => {
  for([indexRow, row] of mutable.entries()) {
    for ([indexElement, element] of row.entries()) {
      if(mutable[indexRow][indexElement] > 9) {
        mutable[indexRow][indexElement] = 0;
      }
    }
  }
  return mutable;
  
}

const doSteps = (heightArr) => {
  const height = heightArr.length;
  const width = heightArr[0].length;
  let flashes = 0;
  let mutable = heightArr;
  let part2answer = 0;
  let part2status = false;
  let steps = 1;

  while ( !part2status) {
    let flashedPositions = [];
    for([indexRow, row] of mutable.entries()) {
      for ([indexElement, element] of row.entries()) {
        mutable[indexRow][indexElement] += 1;
        if(mutable[indexRow][indexElement] > 9) {
          flashedPositions.push([indexRow, indexElement])
        }
      }
    }

    for(flashedPosition of flashedPositions) {
      const n = isTopAvailable(flashedPosition[0]);
      const s = isBottomAvailable(flashedPosition[0], height);
      const w = isLeftAvailable(flashedPosition[1]);
      const e = isRightAvailable(flashedPosition[1], width);
      const nw = n && w;
      const sw = s && w;
      const ne = n && e;
      const se = s && e;

      const checkLight = (position) => mutable[position[0]][position[1]] > 9

      const isUnique = (position) => flashedPositions.find(el => el[0] == position[0] && el[1] == position[1])

      if(n) {
        mutable[flashedPosition[0] - 1][flashedPosition[1]] += 1
        const position = [flashedPosition[0] - 1, flashedPosition[1]]
        if (checkLight(position) && !isUnique(position)) flashedPositions.push(position)
      }
      if(s) {
        mutable[flashedPosition[0] + 1][flashedPosition[1]] += 1 
        const position = [flashedPosition[0] + 1, flashedPosition[1]];
        if (checkLight(position) && !isUnique(position)) flashedPositions.push(position)
      }
      if(w) {
        mutable[flashedPosition[0]][flashedPosition[1] - 1] += 1 
        const position = [flashedPosition[0], flashedPosition[1] - 1];
        if (checkLight(position) && !isUnique(position)) flashedPositions.push(position)
      }
      if(e) {
        mutable[flashedPosition[0]][flashedPosition[1] + 1] += 1 
        const position = [flashedPosition[0], flashedPosition[1] + 1];
        if (checkLight(position) && !isUnique(position)) flashedPositions.push(position)
      }
      if(nw) {
        mutable[flashedPosition[0] - 1][flashedPosition[1] - 1] += 1 
        const position = [flashedPosition[0] - 1, flashedPosition[1] - 1];
        if (checkLight(position) && !isUnique(position)) flashedPositions.push(position)
      }
      if(sw) {
        mutable[flashedPosition[0] + 1][flashedPosition[1] - 1] += 1 
        const position = [flashedPosition[0] + 1, flashedPosition[1] - 1]
        if (checkLight(position) && !isUnique(position)) flashedPositions.push(position)
      }
      if(ne) {
        mutable[flashedPosition[0] - 1][flashedPosition[1] + 1] += 1 
        const position = [flashedPosition[0] - 1, flashedPosition[1] + 1]
        if (checkLight(position) && !isUnique(position)) flashedPositions.push(position)
      }
      if(se) {
        mutable[flashedPosition[0] + 1][flashedPosition[1] + 1] += 1 
        const position = [flashedPosition[0] + 1, flashedPosition[1] + 1]
        if (checkLight(position) && !isUnique(position)) flashedPositions.push(position)
      }
    }
    flashes += flashedPositions.length
    mutable = clear(mutable)

    if(mutable.length * mutable[0].length === flashedPositions.length) {
      part2answer = steps;
      part2status = true;
    }
    steps+=1
  }
  
  return {part1: flashes, part2: part2answer}
}


const calculate = (heightArr) => {
  return doSteps(heightArr);
}

fs.readFile('./input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const elements = data.split("\r\n")
  const heightArr = [];
  for (row of elements) {
    const elements = row.split("")
    const heights = elements.map(element => parseInt(element, 10))
    heightArr.push(heights)
  }

  console.log({answer: calculate(heightArr)})
})

