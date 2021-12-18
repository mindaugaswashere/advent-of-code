const fs = require('fs')

const doPart1 = (fishes) => {
  let fishArr = [];
  for(fish of fishes) {
    fishArr.push(parseInt(fish, 10))
  }

  for(let i = 0; i < 256; i++){
    const newFish = []
    for (const [index, fish] of fishArr.entries()) { 
      if(fish == 0){ 
        newFish.push(8)
        fishArr[index] = 6
      } else {
        fishArr[index] -= 1 
      }
    }
    fishArr = [...fishArr, ...newFish]
  }
  return fishArr.length
}

fs.readFile('./input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const elements = data.split(',')
  const part1 = doPart1(elements)
  console.log({part1})
})

