const fs = require('fs')

String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
} 


const opening1 = "("
const opening2 = "["
const opening3 = "{"
const opening4 = "<"

const closing1 = ")"
const closing2 = "]"
const closing3 = "}"
const closing4 = ">"

const isClosing = (symbol) => {
  if (symbol === closing1 || symbol === closing2 || symbol === closing3 || symbol === closing4) return true
  return false
}

const isOpening = (symbol) => {
  if (symbol === opening1 || symbol === opening2 || symbol === opening3 || symbol === opening4) return true
  return false
}

const doPart1 = (lines) => {
  const corruptedLines = [];
  for (let [indexline, line] of lines.entries()) {
    let mutable = line;
    for(let closeIndex = 0; closeIndex < mutable.length; closeIndex++) {
      const closingBracket = mutable[closeIndex];
      if(isClosing(closingBracket)) {
        let foundOpening = false;
        let openIndex = closeIndex - 1;
        while(!foundOpening) {
          const openBracket = mutable[openIndex]
          if(isOpening(openBracket)) {
            if(
              (closingBracket === closing1 && openBracket === opening1) || 
              (closingBracket === closing2 && openBracket === opening2) || 
              (closingBracket === closing3 && openBracket === opening3) || 
              (closingBracket === closing4 && openBracket === opening4)
            ){
              foundOpening = true
              mutable = mutable.replaceAt(openIndex, " ")
              mutable = mutable.replaceAt(closeIndex, " ")
            } else {
              let already = false;
              for (const corruptedLine of corruptedLines) {
                if(corruptedLine == indexline) already = true
              }
              if(!already){
                corruptedLines.push(indexline)
              }
              foundOpening=true
            }
          } else openIndex--
        }
      }
    }
  }
}

const doPart2 = (lines) => {
  const corruptedLines = [];
 
  for (let [indexline, line] of lines.entries()) {
    let mutable = line;
    for(let closeIndex = 0; closeIndex < mutable.length; closeIndex++) {
      const closingBracket = mutable[closeIndex];
      if(isClosing(closingBracket)) {
        let foundOpening = false;
        let openIndex = closeIndex - 1;
        while(!foundOpening) {
          const openBracket = mutable[openIndex]
          if(isOpening(openBracket)) {
            if(
              (closingBracket === closing1 && openBracket === opening1) || 
              (closingBracket === closing2 && openBracket === opening2) || 
              (closingBracket === closing3 && openBracket === opening3) || 
              (closingBracket === closing4 && openBracket === opening4)
            ){
              foundOpening = true
              mutable = mutable.replaceAt(openIndex, " ")
              mutable = mutable.replaceAt(closeIndex, " ")
            } else {
              let already = false;
              for (const corruptedLine of corruptedLines) {
                if(corruptedLine == indexline) already = true
              }
              if(!already) corruptedLines.push(indexline)
              foundOpening=true
            }
          } else openIndex--
        }
      }
    }
  }
  let scoreList = [];
  for(let i = 0; i <= lines.length -1; i++) {
    if(!corruptedLines.find(find => find == i)) {
      let score = 0;
      let inserted = []

      let closing1count = 0
      let closing2count = 0
      let closing3count = 0
      let closing4count = 0
      let line = lines[i]
      for (let j = line.length - 1; j >= 0; j--) {
        const bracket = line[j]
        if(isClosing(bracket)) {
          if(bracket === closing1) closing1count++
          if(bracket === closing2) closing2count++
          if(bracket === closing3) closing3count++
          if(bracket === closing4) closing4count++
        } else {
          if(bracket === opening1) {
            if(closing1count > 0) {
              closing1count--
            } else inserted.push(closing1)
          } 
          if(bracket === opening2) {
            if(closing2count > 0) {
              closing2count--
            } else inserted.push(closing2)
          } 
          if(bracket === opening3) {
            if(closing3count > 0) {
              closing3count--
            } else inserted.push(closing3)
          } 
          if(bracket === opening4) {
            if(closing4count > 0) {
              closing4count--
            } else inserted.push(closing4)
          } 
 
        }
      }
      for(const insert of inserted) {
        let addition = 0;
        if(insert == closing1) addition = 1
        if(insert == closing2) addition = 2
        if(insert == closing3) addition = 3
        if(insert == closing4) addition = 4
        score = (score * 5) + addition
      }
      scoreList.push(score)
    }
  }
  scoreList.sort(function(a, b) {
    return b - a;
  });
  console.log({length: scoreList.length, scoreList})
  const division = scoreList.length / 2
  return scoreList[division];
}

fs.readFile('./input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const lines = data.split("\r\n")

  const part1 = doPart1(lines)
  // const part2 = doPart2(lines)  
})

