const readAndProcessFile = require("../../utils/readfile");

(async (filePath) => {
  const data = await readAndProcessFile(filePath);
  const { answer, answer2 } = program(data);
  console.log({ answer, answer2 });
})("./input.txt");

function program(data) {
  const answerWire = "a";
  let numericProperties = {};
  let loopCond = [0, 1];
  while (loopCond[0] !== loopCond[1]) {
    data.forEach((row) => {
      const [signal, wire] = splitWireAndSignal(row);
      numericProperties = processSignal(
        signal,
        wire,
        numericProperties,
        loopCond
      );
    });
  }
  const answer = numericProperties[answerWire];
  loopCond = [0, 1];
  resetObjectValues(numericProperties);
  numericProperties["b"] = answer;

  while (loopCond[0] !== loopCond[1]) {
    data.forEach((row) => {
      let [signal, wire] = splitWireAndSignal(row);
      if (wire === "b") signal = String(answer);
      numericProperties = processSignal(
        signal,
        wire,
        numericProperties,
        loopCond
      );
    });
  }

  const answer2 = numericProperties[answerWire];

  return { answer, answer2 };
}

function processSignal(signal, wire, numericProperties, loopCond) {
  const isRshift = signal.search("RSHIFT") >= 0;
  const isLshift = signal.search("LSHIFT") >= 0;
  const isNot = signal.search("NOT") >= 0;
  const isAnd = signal.search("AND") >= 0;
  const isOr = signal.search("OR") >= 0;

  if (isRshift) {
    const [signalValue, bitShiftOperand] = signal.split(" RSHIFT ");
    if (
      numericProperties.hasOwnProperty(signalValue) ||
      !isNaN(Number(signalValue))
    ) {
      const value = numericProperties[signalValue] || Number(signalValue);
      const caluclatedValue = rshift(value, bitShiftOperand);
      if (Number(caluclatedValue) || Number(caluclatedValue) === 0)
        numericProperties[wire] = caluclatedValue;
    }
  } else if (isLshift) {
    const [signalValue, bitShiftOperand] = signal.split(" LSHIFT ");
    if (
      numericProperties.hasOwnProperty(signalValue) ||
      !isNaN(Number(signalValue))
    ) {
      const value = numericProperties[signalValue] || Number(signalValue);
      const caluclatedValue = lshift(value, bitShiftOperand);
      if (Number(caluclatedValue) || Number(caluclatedValue) === 0)
        numericProperties[wire] = caluclatedValue;
    }
  } else if (isNot) {
    const signalValue = signal.split("NOT ")[1];
    if (
      numericProperties.hasOwnProperty(signalValue) ||
      !isNaN(Number(signalValue))
    ) {
      const value = numericProperties[signalValue] || Number(signalValue);
      const caluclatedValue = not(value);
      if (Number(caluclatedValue) || Number(caluclatedValue) === 0)
        numericProperties[wire] = caluclatedValue;
    }
  } else if (isAnd) {
    const [leftOperand, rightOperand] = signal.split(" AND ");

    if (
      numericProperties.hasOwnProperty(leftOperand) ||
      (!isNaN(Number(leftOperand)) &&
        numericProperties.hasOwnProperty(rightOperand)) ||
      !isNaN(Number(rightOperand))
    ) {
      const leftOperandValue =
        numericProperties[leftOperand] || Number(leftOperand);
      const rightOperandValue =
        numericProperties[rightOperand] || Number(rightOperand);
      const caluclatedValue = and(leftOperandValue, rightOperandValue);
      if (Number(caluclatedValue) || Number(caluclatedValue) === 0)
        numericProperties[wire] = caluclatedValue;
    }
  } else if (isOr) {
    const [leftOperand, rightOperand] = signal.split(" OR ");
    if (
      numericProperties.hasOwnProperty(leftOperand) ||
      !isNaN(
        Number(leftOperand) && numericProperties.hasOwnProperty(rightOperand)
      ) ||
      !isNaN(Number(rightOperand))
    ) {
      const leftOperandValue =
        numericProperties[leftOperand] || Number(leftOperand);
      const rightOperandValue =
        numericProperties[rightOperand] || Number(rightOperand);
      const caluclatedValue = or(leftOperandValue, rightOperandValue);
      if (!isNaN(Number(caluclatedValue)))
        numericProperties[wire] = caluclatedValue;
    }
  } else if (!isNaN(Number(signal))) {
    numericProperties[wire] = Number(signal);
  } else if (
    numericProperties.hasOwnProperty(signal) &&
    numericProperties[signal] > 0
  ) {
    loopCond[0] = loopCond[1];
    loopCond[1] = numericProperties[wire];
    // values keeps recalculating after being initialized, so as long as calculations changes, it should continue looping
    numericProperties[wire] = numericProperties[signal];
  }

  return numericProperties;
}

function resetObjectValues(obj) {
  Object.keys(obj).forEach((key) => {
    obj[key] = undefined;
  });
}

function splitWireAndSignal(row) {
  return row.split(" -> ");
}

function and(x, y) {
  return x & y;
}

function or(x, y) {
  return x | y;
}

function lshift(x, y) {
  return x << y;
}

function rshift(x, y) {
  return x >> y;
}

function not(x) {
  return ~x & 0xffff;
}

function sortObjectAlphabetically(obj) {
  const sortedKeys = Object.keys(obj).sort();
  const sortedObj = {};

  sortedKeys.forEach((key) => {
    sortedObj[key] = obj[key];
  });

  return sortedObj;
}
