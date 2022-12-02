const fs = require("fs");

const prog = (directions) => {
  let uniqueVisits = 1;
  let currentCoord = [0, 0];
  let visitedCoords = [[0, 0]];

  directions.forEach((dir) => {
    if (dir === "^") {
      currentCoord = [currentCoord[0], currentCoord[1] + 1];
    }
    if (dir === "v") {
      currentCoord = [currentCoord[0], currentCoord[1] - 1];
    }
    if (dir === ">") {
      currentCoord = [currentCoord[0] + 1, currentCoord[1]];
    }
    if (dir === "<") {
      currentCoord = [currentCoord[0] - 1, currentCoord[1]];
    }

    let cond = true;
    visitedCoords.forEach((coord) => {
      if (currentCoord[0] === coord[0] && currentCoord[1] === coord[1]) {
        cond = false;
      }
    });

    if (cond) {
      visitedCoords.push(currentCoord);
      uniqueVisits++;
    }
  });
  return uniqueVisits;
};

const prog2 = (directions) => {
  let uniqueVisits = 1;
  let santaCoord = [0, 0];
  let roboCoord = [0, 0];

  let visitedCoords = [[0, 0]];

  directions.forEach((dir, index) => {
    if (index % 2 !== 0) {
      if (dir === "^") {
        santaCoord = [santaCoord[0], santaCoord[1] + 1];
      }
      if (dir === "v") {
        santaCoord = [santaCoord[0], santaCoord[1] - 1];
      }
      if (dir === ">") {
        santaCoord = [santaCoord[0] + 1, santaCoord[1]];
      }
      if (dir === "<") {
        santaCoord = [santaCoord[0] - 1, santaCoord[1]];
      }
      let cond = true;
      visitedCoords.forEach((coord) => {
        if (santaCoord[0] === coord[0] && santaCoord[1] === coord[1]) {
          cond = false;
        }
      });

      if (cond) {
        visitedCoords.push(santaCoord);
        uniqueVisits++;
      }
    } else {
      if (dir === "^") {
        roboCoord = [roboCoord[0], roboCoord[1] + 1];
      }
      if (dir === "v") {
        roboCoord = [roboCoord[0], roboCoord[1] - 1];
      }
      if (dir === ">") {
        roboCoord = [roboCoord[0] + 1, roboCoord[1]];
      }
      if (dir === "<") {
        roboCoord = [roboCoord[0] - 1, roboCoord[1]];
      }
      let cond = true;
      visitedCoords.forEach((coord) => {
        if (roboCoord[0] === coord[0] && roboCoord[1] === coord[1]) {
          cond = false;
        }
      });

      if (cond) {
        visitedCoords.push(roboCoord);
        uniqueVisits++;
      }
    }
  });
  return uniqueVisits;
};

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const directions = data.split("");
  const answer = prog(directions);
  const answer2 = prog2(directions);

  console.log({ answer, answer2 });
});
