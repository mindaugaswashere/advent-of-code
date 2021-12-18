const fs = require('fs')

const doPart1 = (delimiters) => {
  let counter = 0
  for (del of delimiters) {
    const delim = del.split(" | ")
    const numbers = delim[1].split(" ")
    for(number of numbers) {
      if(number.length == 7 
        || number.length == 4 
        || number.length == 3 
        || number.length == 2 ) counter++
    }
  }
  return counter
}

const findA = (num7, num1) => {
  let a = num7
  for(let i = 0; i < num1.length; i++) {
    a = a.replace(num1[i], "")
  } 
  return a
}

const findC = (unknown, num1, num8) => {
  let length6 = []
  for(unkn of unknown) {
    if (unkn.length === 6) length6.push(unkn)
  }
  for(word of length6) {
    let number8 = num8
    for(let i = 0; i < word.length; i++) {
      number8 = number8.replace(word[i], "")
    }
    for(let i = 0; i < num1.length; i++) {
      number8 = number8.replace(num1[i], "")
      if(number8.length === 0) {
        return num1[i]
      }
    }
  }
}

const findF = (num1, c) => num1.replace(c, "")

const find6 = (num8, c) => num8.replace(c, "")

const rem = (unknown, known) => {
  for(unk of unknown) {
    let kn = known;
    for(let i = 0; i < unk.length; i++) {
      kn = kn.replace(unk[i], "")
      if(kn.length == 0) return unk;
    }
  }
}

const find0 = (unknown, num4, num8, letterA) => {
  let num0 = ""
  let num9 = ""
  let letterGArr = []
  const searchable = unknown.filter(un => un.length == 6)
  for (letters of searchable) {
    let replacable = letters;
    for(let i = 0; i < num4.length; i++) {
      replacable = replacable.replace(num4[i], "")
    }
    if(replacable.length == 2) {
      num9 = letters
      letterGArr.push(replacable)
    }
    if(replacable.length == 3) {
      num0 = letters
      letterGArr.push(replacable)
    }
  }
  let e;
  if (letterGArr[0].length < letterGArr[1].length) {
    e = letterGArr[1];
    for(let i = 0; i < letterGArr[0].length; i++) {
      e = e.replace(letterGArr[0][i], "")
    }
  } else {
    e = letterGArr[0];
    for(let i = 0; i < letterGArr[1].length; i++) {
      e = e.replace(letterGArr[1][i], "")
    }
  }
  

  let d = num8;
  for(let i = 0; i < num0.length; i++) {
    d = d.replace(num0[i], "")
  }

  let g = num8;

  for(let i = 0; i < num4.length; i++) {
    g = g.replace(num4[i], "")
  }

  g = g.replace(letterA, '')
  g = g.replace(e, '')

  return {num0, num9, e, d, g}
}

const findB = (num8, letters) => { 
  let replacable = num8
  for (const [_, value] of Object.entries(letters)) {
    replacable = replacable.replace(value, "")
  }
  return replacable
}

const findNum = (num, letters) => {
  const num0 = [letters.a, letters.b, letters.c, letters.e, letters.f, letters.g]
  const num6 = [letters.a, letters.b, letters.d, letters.e, letters.f, letters.g]
  const num9 = [letters.a, letters.b, letters.c, letters.d, letters.f, letters.g]
  const num2 = [letters.a, letters.c, letters.d, letters.e, letters.g]
  const num3 = [letters.a, letters.c, letters.d, letters.f, letters.g]
  const num5 = [letters.a, letters.b, letters.d, letters.f, letters.g]

  if (num.length == 6) {
    let foundLetters = 0
    for (let i = 0; i < num.length; i++) {
      if(num0.find(e => e == num[i])) foundLetters++ 
    }
    if (foundLetters === num.length) return '0'
    foundLetters = 0
    for (let i = 0; i < num.length; i++) {
      if(num6.find(e => e == num[i])) foundLetters++ 
    }
    if (foundLetters === num.length) return '6'
    foundLetters = 0
    for (let i = 0; i < num.length; i++) {
      if(num9.find(e => e == num[i])) foundLetters++ 
    }
    if (foundLetters === num.length) return '9'
  }

  if (num.length == 5) {
    let foundLetters = 0
    for (let i = 0; i < num.length; i++) {
      if(num2.find(e => e == num[i])) foundLetters++ 
    }
    if (foundLetters === num.length) return '2'
    foundLetters = 0
    for (let i = 0; i < num.length; i++) {
      if(num3.find(e => e == num[i])) foundLetters++ 
    }
    if (foundLetters === num.length) return '3'
    foundLetters = 0
    for (let i = 0; i < num.length; i++) {
      if(num5.find(e => e == num[i])) foundLetters++ 
    }
    if (foundLetters === num.length) return '5'
  }
}

const findValues = (del, letters) => {
  let finalnum = ""
  const numbers = del.split(" ")
  for (number of numbers) {
    switch(number.length) {
      case 2: 
        finalnum = finalnum + "1"
        break
      case 4: 
        finalnum = finalnum + "4"
        break
      case 3: 
        finalnum = finalnum + "7"
        break
      case 7: 
        finalnum = finalnum + "8"
        break
      default:
        finalnum = finalnum + findNum(number, letters)
    }
  }
  return finalnum
}

const doPart2 = (elements) => {
  let sum = 0;
  for(element of elements) {
    const delimitered = element.split(" | ")
    const letters = {}
    const numbers = {}
    let unknown = delimitered[0].split(" ")
    for(delim of unknown) {
      if(delim.length === 2 ) {
        numbers["1"] = delim
        unknown = unknown.filter(el => el != delim)
      }
      if(delim.length === 4 ) {
        numbers["4"] = delim
        unknown = unknown.filter(el => el != delim)
      }
      if(delim.length === 3 ) {
        numbers["7"] = delim
        unknown = unknown.filter(el => el != delim)
      }
      if(delim.length === 7 ) {
        numbers["8"] = delim
        unknown = unknown.filter(el => el != delim)
      }
    }
    letters.a = findA(numbers[7], numbers[1])
    letters.c = findC(unknown, numbers[1], numbers[8])
    letters.f = findF(numbers[1], letters.c)
    numbers[6] = find6(numbers[8], letters.c);
    unknown = unknown.filter(e => e != rem(unknown, numbers[6]));
    const {num0, num9, e, d, g} = find0(unknown, numbers[4], numbers[8], letters.a)
    numbers[0] = num0
    numbers[9] = num9
    letters.e = e
    letters.d = d
    letters.g = g
    letters.b = findB(numbers[8], letters)
    const valuestr = findValues(delimitered[1], letters);
    const value = parseInt(valuestr, 10)
    sum += value
  }
  return sum
}

fs.readFile('./input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const elements = data.split("\r\n")
  const part1 = doPart1(elements)
  const part2 = doPart2(elements)
  console.log({part1, part2})
})

