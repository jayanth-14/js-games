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

function displayJunction(length, signals, roads, vehicle) {
  const half = Math.floor(length / 2);
  let junction = "";
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      const ts = getSymbol(signals, i, j, '🔴');
      const vs = getSymbol(roads, i, j, vehicle);

      junction += ts === '  ' ? vs : ts;
    }
    junction += "\n";
  }
  console.log(junction);
}

function start() {
  const length = 5;
  const vehicle = "🚖";
  const roads = [[[1, 2]], [[2, 0]], [[]], [[]]];
  const signals = [[[1, 1]], [[1, 3]], [[3, 3]], [[3, 1]]];

  displayJunction(length, signals, roads, vehicle);
}

start();
