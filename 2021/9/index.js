const fs = require('fs')

const isEdge = (height, width, maxHeight, maxWidth) => {
   
}

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

const findLowestPoints = (heightArr) => {
  const lowestPoints = [];
  const height = heightArr.length;
  const width = heightArr[0].length;

  for([indexRow, row] of heightArr.entries()) {
    for ([indexElement, element] of row.entries()) {
      let totalSides = 0;
      let biggerSides = 0;
      if(isTopAvailable(indexRow)) {
        totalSides++
        if(element < heightArr[indexRow - 1][indexElement]) biggerSides++
      }
      if(isBottomAvailable(indexRow, height)) {
        totalSides++
        if(element < heightArr[indexRow + 1][indexElement]) biggerSides++
      }
      if(isLeftAvailable(indexElement)) {
        totalSides++
        if(element < heightArr[indexRow][indexElement - 1]) biggerSides++
      }
      if(isRightAvailable(indexElement, width)) {
        totalSides++
        if(element < heightArr[indexRow][indexElement + 1]) biggerSides++
      }

      if (biggerSides == totalSides) lowestPoints.push(element)
      // console.log({element,
      //   top: isTopAvailable(indexRow), 
      //   left: isLeftAvailable(indexElement),
      //   right: isRightAvailable(indexElement, width),
      //   bottom: isBottomAvailable(indexRow, height)
      // })
    }
  }
  return lowestPoints
}

const findBasins = (rowIndex, columnIndex, heightArr) => {
  const queue = [[rowIndex, columnIndex]]
  const basinArray = [[rowIndex, columnIndex]]
  const height = heightArr.length;
  const width = heightArr[0].length;

  for(position of queue) {
    if(isTopAvailable(position[0])) {
      if(heightArr[position[0]][position[1]] < heightArr[position[0] - 1][position[1]] && heightArr[position[0] - 1][position[1]] != 9) {
        if(!basinArray.find(basin => basin[0] == position[0] - 1 && basin[1] == position[1])) {
          queue.push([position[0] - 1, position[1]])
          basinArray.push([position[0] - 1, position[1]])
        } 
      }
    }
    if(isBottomAvailable(position[0], height)) {
      if(heightArr[position[0]][position[1]] < heightArr[position[0] + 1][position[1]] && heightArr[position[0] + 1][position[1]] != 9) {
        if(!basinArray.find(basin => basin[0] == position[0] + 1  && basin[1] == position[1])) {
          queue.push([position[0] + 1, position[1]])
          basinArray.push([position[0] + 1, position[1]])
        } 
      }
    }
    if(isLeftAvailable(position[1])) {
      if(heightArr[position[0]][position[1]] < heightArr[position[0]][position[1] - 1] && heightArr[position[0]][position[1] - 1] != 9) {
        if(!basinArray.find(basin => basin[0] == position[0] && basin[1] == position[1] - 1)) {
          queue.push([position[0], position[1] - 1])
          basinArray.push([position[0], position[1] - 1])
        } 
      }
    }
    if(isRightAvailable(position[1], width)) {
      if(heightArr[position[0]][position[1]] < heightArr[position[0]][position[1] + 1] && heightArr[position[0]][position[1] + 1] != 9) {
        if(!basinArray.find(basin => basin[0] == position[0] && basin[1] == position[1] + 1)) {
          queue.push([position[0], position[1] + 1])
          basinArray.push([position[0], position[1] + 1])
        } 
      }
    }
  }
  return basinArray.length
}

const findBasinsSizes = (heightArr) => {
  const height = heightArr.length;
  const width = heightArr[0].length;
  const basinLengths = [];

  for([indexRow, row] of heightArr.entries()) {
    for ([indexElement, element] of row.entries()) {
      let totalSides = 0;
      let biggerSides = 0;
      if(isTopAvailable(indexRow)) {
        totalSides++
        if(element < heightArr[indexRow - 1][indexElement]) biggerSides++
      }
      if(isBottomAvailable(indexRow, height)) {
        totalSides++
        if(element < heightArr[indexRow + 1][indexElement]) biggerSides++
      }
      if(isLeftAvailable(indexElement)) {
        totalSides++
        if(element < heightArr[indexRow][indexElement - 1]) biggerSides++
      }
      if(isRightAvailable(indexElement, width)) {
        totalSides++
        if(element < heightArr[indexRow][indexElement + 1]) biggerSides++
      }
      if (biggerSides == totalSides) {
        basinLengths.push(findBasins(indexRow, indexElement, heightArr))
      }
    }
  }
  return basinLengths
}

const findLargestThree = (basinSizeArr) => {
  const mutable = basinSizeArr;
  let multiplication = 1;

  for (let i = 0; i < 3; i++) {
    const biggest = Math.max(...mutable);
    let index = mutable.indexOf(biggest);
    mutable.splice(index, 1)
    multiplication *= biggest;
  }
  return multiplication
}

const doPart1 = (heightArr) => {
  const points = findLowestPoints(heightArr);
  return points.reduce((previousValue, currentValue) => 1 + previousValue + currentValue) + 1 
}


const doPart2 = (heightArr) => {
  const basinSizes = findBasinsSizes(heightArr);
  const multiplication = findLargestThree(basinSizes)

  console.log({multiplication})
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

  console.log(heightArr)
  // const part1 = doPart1(heightArr)
  const part2 = doPart2(heightArr)
  // console.log({part1})
})

