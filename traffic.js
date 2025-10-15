const VEHICLE = "🚖";
const SIGNAL_NUMBERS = ["1 ", "2 ", "4 ", "3 "];

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
  return typeof x === "object";
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
  return "  ";
}

function toggleSignal(signal, activeSignal) {
  return signal.trim() === activeSignal + ""
    ? bold(green(signal))
    : bold(red(signal));
}

function displayJunction(length, signals, roads, activeSignal) {
  let junction = "";
  let signalCounter = 0;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      const ts = getSymbol(signals, i, j, SIGNAL_NUMBERS[signalCounter]);
      const vs = getSymbol(roads, i, j, VEHICLE);

      signalCounter += ts !== "  " ? 1 : 0;
      junction += ts === "  " ? vs : toggleSignal(ts, activeSignal);
    }
    junction += "\n";
  }
  console.log(junction);
}

function askSignal() {
  return parseInt(prompt("Enter the signal number to open : "));
}

function getRoadIndex(activeSignal) {
  return (activeSignal + 1) % 4;
}

function popVehicles(roads, roadIndex) {
  roads[roadIndex].splice(0, roads[roadIndex].length);
}

function areRoadsEmpty(roads) {
  for (let index = 0; index < roads.length; index++) {
    if (roads[index].length !== 0) {
      return false;
    }
  }
  return true;
}

function generateVehiclePosition(size) {
  const half = Math.floor(size / 2);
  if (Math.random() < 0.5) {
    return [half, Math.floor(Math.random() * size)];
  }
  return [Math.floor(Math.random() * size), half];
}

function addVehicleToRoad(vehiclePosition, roads, size) {
  const half = Math.floor(size / 2);
  if (vehiclePosition[1] < half) {
    roads[0].push(vehiclePosition);
    return;
  }
  if (vehiclePosition[0] < half) {
    roads[1].push(vehiclePosition);
    return;
  }
  if (vehiclePosition[1] > half) {
    roads[2].push(vehiclePosition);
    return;
  }
  if (vehiclePosition[0] > half) {
    roads[3].push(vehiclePosition);
    return;
  }
}

function start() {
  const length = 5;
  const roads = [[], [], [], []];
  const signals = [[[1, 1]], [[1, 3]], [[3, 3]], [[3, 1]]];

  let activeSignal = 0;
  let isGameOver = false;
  addVehicleToRoad(generateVehiclePosition(length), roads, length);
  while (!isGameOver) {
    addVehicleToRoad(generateVehiclePosition(length), roads, length);
    displayJunction(length, signals, roads, activeSignal);
    activeSignal = askSignal();
    const roadIndex = getRoadIndex(activeSignal);
    popVehicles(roads, roadIndex);
    isGameOver = areRoadsEmpty(roads);
    console.clear();
  }
  displayJunction(length, signals, roads, activeSignal);
}

start();
