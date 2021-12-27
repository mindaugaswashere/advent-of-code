const fs = require('fs')

const arrayEquals = (a, b) => Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0)

const findRoutes = (routes) => {
  const queue = routes["start"];
  const possibleRoutes = []
  const completedRoutes = []
  const doubled = []
  for(const [i, branch] of queue.entries()) {
    possibleRoutes[i] = []
    possibleRoutes[i].push("start")
    possibleRoutes[i].push(branch)
  }

  for (const [ind, route] of possibleRoutes.entries()) {
    const element = route[route.length - 1]
    const branches = routes[element]

    for (const branch of branches) {
      const copyArr = [...route]
      copyArr.pop()
      const occurences = countOccurrences(route, element)
      const cond = copyArr.find(letter => {
        const isLower = letter === element.toLowerCase()
        return isLower
      })
      const newRoute = [...possibleRoutes[ind], branch]

      if(cond) {
        if(branch !== "end" && occurences <= 2 && !doubled[ind]) {
          const uniqum = true
          for(let possibleRoute of possibleRoutes) {
            if(arrayEquals(possibleRoute, newRoute)) uniqum = false
          }
          if (uniqum) {
            possibleRoutes.push(newRoute)
          } 
          doubled[possibleRoutes.length] = false
        } else doubled[possibleRoutes.length] = true
        
      } else {
        if(branch === "end") {
          let uniqum = true;
          for(let completedRoute of completedRoutes) {
            if(arrayEquals(completedRoute, newRoute)) uniqum = false
          }
          if(uniqum) completedRoutes.push(newRoute)

        } else {
          let uniqum = true;
          for(let possibleRoute of possibleRoutes) {
            if(arrayEquals(possibleRoute, newRoute)) uniqum = false
          }
          if(uniqum) possibleRoutes.push(newRoute)
        }
      }
    }
  }

  console.log({completedRoutes}, {doubled})
  return completedRoutes.length

}

const doPart1 = (routes) => {
  const routeObj = {}
  const entities = []
  for(const route of routes) {
    entities.push(route[0])
    entities.push(route[1])
  }
  let uniques = new Set([...entities])
  for (const uniq of uniques) {
    routeObj[uniq] = []
    for(const route of routes) {
      if(route[0] == uniq) {
        if(route[1] !== "start") routeObj[uniq] = [...routeObj[uniq], route[1]]
      }
      if(route[1] == uniq) {
        if(route[0] !== "start") routeObj[uniq] = [...routeObj[uniq], route[0]]
      }
    }
  }
  return findRoutes(routeObj)
}


fs.readFile('./input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const elements = data.split("\r\n")
  const routes = [];
  for (row of elements) {
    const elements = row.split("-")
    routes.push(elements)
  }

  result = doPart1(routes)
  console.log({result})
})

