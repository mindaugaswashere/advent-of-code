const fs = require('fs')

const omitDiagonals = (coords) => coords.filter(coord => {
  const x1 = coord[0][0]
  const x2 = coord[1][0]
  const y1 = coord[0][1]
  const y2 = coord[1][1]
  return !((x1 != x2) && (y1 != y2))
})

const isHorizontal = (line) => { 
  const x1 = line[0][0]
  const x2 = line[1][0]
  if (x1 > x2 || x1 < x2) return true;
  return false;
}

const formDiagram = (omited) => { 
  const diagram = [];

  for(let i = 0; i < 1000; i++){
    diagram.push([])
    for(let j = 0; j < 1000; j++) {
      diagram[i][j] = 0;
    }
  }
  
  for (const line of omited) {
    const x1 = line[0][0]
    const x2 = line[1][0]
    const y1 = line[0][1]
    const y2 = line[1][1]
    if(isHorizontal(line)) {
      if(x1 < x2) {
        for(i = x1; i <= x2; i++) {
          diagram[y1][i]++
        }
      } else {
        for(i = x1; i >= x2; i--) {
          diagram[y1][i]++
        }
      }
    } else {
      if(y1 < y2) {
        for(i = y1; i <= y2; i++) {
          diagram[i][x1]++
        }
      } else {
        for(i = y1; i >= y2; i--) {
          diagram[i][x1]++
        }
      }
    }
  }

  return diagram;
}

const readDiagram = (diagram) => {
  let counter = 0;
  for(let i = 0; i < 1000; i++) {
    for(let j = 0; j < 1000; j++) {
      if(diagram[i][j] >= 2) {

        counter++
      }; 
    }
  }
  return counter;
}

const doPart1 = (lines) => {
  let coords = []
  let coordinates = []
  for(const line of lines) {
    coords.push(line.split(' -> '))
  }

  for(const coord of coords) {
    const first = coord[0].split(',')
    const second = coord[1].split(',')
    coordinates.push([first, second])
  }

  const omited = omitDiagonals(coordinates);
  const diagram = formDiagram(omited)
  const overlapCount = readDiagram(diagram)
  console.log({overlapCount})
}

fs.readFile('./input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const lines = data.split('\n')
  const part1 = doPart1(lines)

})

