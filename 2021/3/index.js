const fs = require('fs')

const getPowerRate = (lines) => {
  let gamma = ''
  let epsilon = ''

  for (let i = 0; i < lines[0].length; i++) {
    let bit0 = 0
    let bit1 = 0

    lines.forEach(line => {
      line[i] == '1' ? bit1++ : bit0++
    });

    if (bit1 > bit0) {
      gamma = `${gamma}1`
      epsilon = `${epsilon}0`

    } else {
      gamma = `${gamma}0`
      epsilon = `${epsilon}1`
    }
  }

  const powerRate = parseInt(gamma, 2) * parseInt(epsilon,2)
  
  console.log({powerRate})
}

const lifeSupportRate = (lines) => {
  let binaryArr = [...lines];
  let i = 0

  while (binaryArr.length > 1) {
    let bit0 = 0
    let bit1 = 0

    binaryArr.forEach(line => {
      line[i] == '1' ? bit1++ : bit0++
    });

    if (bit1 === bit0) { binaryArr = binaryArr.filter(word => word[i] === '1') }
    else if (bit1 > bit0) {
      binaryArr = binaryArr.filter(word => word[i] === '1')
    } else {
      binaryArr = binaryArr.filter(word => word[i] === '0')
    }
    i++
  }

  const oxygen = parseInt(binaryArr[0], 2)
  
  binaryArr = [...lines]
  i = 0

  while (binaryArr.length > 1) {
    let bit0 = 0
    let bit1 = 0

    binaryArr.forEach(line => {
      line[i] == '1' ? bit1++ : bit0++
    });
    if (bit1 === bit0) { binaryArr = binaryArr.filter(word => word[i] === '0') }
    else if (bit1 > bit0) {
      binaryArr = binaryArr.filter(word => word[i] === '0')
    } else {
      binaryArr = binaryArr.filter(word => word[i] === '1')
    }
    i++
  }

  const co2 = parseInt(binaryArr[0], 2)

  console.log({lifeSupportRate: oxygen * co2})
}

fs.readFile('./input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const lines = data.split('\n')
  const res1 = getPowerRate(lines)
  const res2 = lifeSupportRate(lines);
})