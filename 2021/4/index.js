const fs = require('fs')

const formTickets = (lines) => {
  let tickets = [];
  let ticketNo = 0;

  for(let i = 2; i < lines.length; i++) {
    if (lines[i] !== '') {
      const currentTicket = tickets[ticketNo] || [];
      const row = lines[i].split(' ').filter(x=> x !== '');
      tickets[ticketNo] = [...currentTicket, row]
    } else ticketNo++
  }
  return tickets;
}

const mark = (number, tickets) => {
  let mutable = [...tickets];
  const marked = mutable.map(ticket => {
    return ticket.map(row => {
      return row.map(num => {
        if (num == number) return "@"
        return num
      })
    })
  })
  return marked; 
}

const checkRow = (ticket) => {
  for (row of ticket) {
    let marked = 0;
    for(number of row) {
      if (number == "@") marked++
    }
    if (marked === 5) return true
  }
  return false
}

const checkColumn = (ticket) => {
  for(let i = 0; i < ticket[0].length; i++) {
    let marked = 0;
    for(row of ticket) {
      if(row[i] == "@") marked++
    }
    if(marked == 5) return true
  }
  return false;
}

const checkWinner = (tickets) => {
  for (const [index, ticket] of tickets.entries()) { 
    if(checkRow(ticket)) {
      return index;
    } else if (checkColumn(ticket)) {
      return index;
    }
  }
}

const checkWinners = (tickets) => {
  const winnerArr = [];
  for (const [index, ticket] of tickets.entries()) { 
    if(checkRow(ticket)) {
      winnerArr.push(index);
    } else if (checkColumn(ticket)) {
      winnerArr.push(index);
    }
  }
  // if(winnerArr.length > 0) {
  //   console.log({winnerArr})
  // }
  return winnerArr;
}

const countScore = (remaindingTicket, winnerNumber) => {
  let sum = 0;
  for (row of remaindingTicket) {
    for (symbol of row) {
      if (symbol != "@") sum+=parseInt(symbol, 10)
    }
  }
  return sum * winnerNumber;
}

const play = (numbers, tickets) => { 
  let newTickets = [...tickets]
  for (number of numbers) {
    const numberConst = number;
    newTickets = mark(number, newTickets)
    const winner = checkWinner(newTickets);
    if(winner) {
      return countScore(newTickets[winner], numberConst);
    };
  }
}

const playUntilLast = (numbers, tickets) => { 
  let newTickets = [...tickets]
  let newNumbers = [...numbers]
  let lastWinner = []; 
  for (number of newNumbers) {
    const numberConst = number;

    
    newTickets = mark(number, newTickets)
    const winners = checkWinners(newTickets);
    if (winners.length > 0) {
      for (let i = winners.length - 1; i >= 0; i--) {
        newTickets.splice(winners[i], 1)
      }
    }
    if (newTickets.length <= 1) {
      console.log("last, ")
      lastWinner.push(newTickets[0]);
      //to be finished
    }
    if(newTickets.length <= 0) {
      console.log({last: lastWinner[0], numberConst, winners})
    }
  }
  
}

const doPart1 = (numbers, tickets) => {
  return play(numbers, tickets);
}

const doPart2 = (numbers, tickets) => {
  return playUntilLast(numbers, tickets);
}

fs.readFile('./input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const lines = data.split('\n')

  const numbers = lines[0].split(',');
  const tickets = formTickets(lines);

  const part1 = doPart1(numbers, tickets);
  const part2 = doPart2(numbers, tickets);

  console.log({part1, part2})
})

