function red(text) {
  return "\x1B[31m" + text + "\x1B[0m";
}

function green(text) {
  return "\x1B[32m" + text + "\x1B[0m";
}

function bold(text) {
  return "\x1B[1m" + text + "\x1B[0m";
}

function isArray(x) {
  return typeof x === 'object';
}

function areArraysEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let index = 0; index < array1.length; index++) {
    if (!areDeepEqual(array1[index], array2[index])) {
      return false;
    }
  }

  return true;
}

function areDeepEqual(array1, array2) {
  if (typeof array1 !== typeof array2) {
    return false;
  }

  if (isArray(array1) && isArray(array2)) {
    return areArraysEqual(array1, array2);
  }

  return array1 === array2;
}

function includes(array, target) {
  for (let index = 0; index < array.length; index++) {
    if (areDeepEqual(target, array[index])) {
      return true;
    }
  }
  return false;
}

function getSymbol(array, row, column, symbol) {
  for (let index = 0; index < array.length; index++) {
    if (includes(array[index], [row, column])) {
      return symbol;
    }
  }
  return '  ';
}

function toggleSignal(signal, signalCounter, activeSignal) {
  return signalCounter === activeSignal ? bold(green(signal)) : bold(red(signal));
}

function displayJunction(length, signals, signalSymbols, roads, vehicle, activeSignal) {
  const half = Math.floor(length / 2);
  let junction = "";
  let signalCounter = 0;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      const ts = getSymbol(signals, i, j, signalSymbols[signalCounter]);
      const vs = getSymbol(roads, i, j, vehicle);
      signalCounter += ts !== "  " ? 1 : 0;
      junction += ts === '  ' ? vs : toggleSignal(ts, signalCounter, activeSignal);
    }
    junction += "\n";
  }
  console.log(junction);
}

function askSignal() {
  return parseInt(prompt("Enter the signal number to open : "));
}

function start() {
  const length = 5;
  const vehicle = "🚖";
  const roads = [[[0, 2], [1, 2]], [[2, 0]], [[]], [[]]];
  const signals = [[[1, 1]], [[1, 3]], [[3, 3]], [[3, 1]]];
  const signalNumbers = ["1 ", "2 ", "3 ", "4 "];
  let activeSignal = 0;
  displayJunction(length, signals, signalNumbers, roads, vehicle, activeSignal);
  activeSignal = askSignal();
  displayJunction(length, signals, signalNumbers, roads, vehicle, activeSignal);
}

start();
