const readAndProcessFile = require("../../utils/readfile");

(async (filePath) => {
  const data = await readAndProcessFile(filePath);
  const answer1 = program1(data);
  const answer2 = program2(data);
  console.log({ answer1, answer2 });
})("./input.txt");

function program1(data) {
  let lights = formEmptyLightArray();

  data.forEach((row) => {
    const command = processRow(row);
    lights = processCommand(command, lights);
  });
  return countLitLights(lights);
}

function program2(data) {
  let lights = formEmptyLightArray();

  data.forEach((row) => {
    const command = processRow(row);
    lights = processPartTwoCommand(command, lights);
  });
  return sumBrightness(lights);
}

function formEmptyLightArray() {
  const lights = [];
  for (let y = 0; y < 1000; y++) {
    const row = [];
    for (let x = 0; x < 1000; x++) {
      row.push(0);
    }
    lights.push(row);
  }
  return lights;
}

function processRow(row) {
  const commands = ["turn on ", "turn off ", "toggle "];
  const [first, second] = row.split("through ");
  const firstCommand = first.trim();
  let finalCommand = "";
  let coord1 = "";
  commands.forEach((command) => {
    const found = firstCommand.search(command);
    if (found === 0) {
      finalCommand = command.trim();
      coord1 = firstCommand.split(command)[1];
    }
  });
  return { action: finalCommand, from: coord1, to: second };
}

function processCommand(command, lights) {
  const lightsRef = lights;
  const [fromCoordX, fromCoordY] = command.from.split(",").map(Number);
  const [toCoordX, toCoordY] = command.to.split(",").map(Number);

  for (let y = fromCoordY; y <= toCoordY; y++) {
    for (let x = fromCoordX; x <= toCoordX; x++) {
      if (command.action === "toggle") {
        if (lightsRef[y][x] == 1) lightsRef[y][x] = 0;
        else lightsRef[y][x] = 1;
      }
      if (command.action === "turn on") lightsRef[y][x] = 1;
      if (command.action === "turn off") lightsRef[y][x] = 0;
    }
  }

  return lightsRef;
}

function countLitLights(lights) {
  let litCounter = 0;
  for (i = 0; i < 1000; i++) {
    for (j = 0; j < 1000; j++) {
      if (lights[i][j] === 1) litCounter++;
    }
  }
  return litCounter;
}

function processPartTwoCommand(command, lights) {
  const lightsRef = lights;
  const [fromCoordX, fromCoordY] = command.from.split(",").map(Number);
  const [toCoordX, toCoordY] = command.to.split(",").map(Number);

  for (let y = fromCoordY; y <= toCoordY; y++) {
    for (let x = fromCoordX; x <= toCoordX; x++) {
      if (command.action === "toggle") lightsRef[y][x] += 2;
      if (command.action === "turn on") lightsRef[y][x] += 1;
      if (command.action === "turn off") {
        if (lightsRef[y][x] > 0) lightsRef[y][x] -= 1;
      }
    }
  }
  return lightsRef;
}

function sumBrightness(lights) {
  let brigthnessCounter = 0;
  for (y = 0; y < 1000; y++) {
    for (x = 0; x < 1000; x++) {
      brigthnessCounter += lights[y][x];
    }
  }
  return brigthnessCounter;
}
