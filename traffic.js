
function getSymbol(i, j, half) {
  if (i === half && j === half) {
    return "  ";
  }
  if (i === half || j === half) {
    return "🚖";
  }
  if (i + 1 === half && j + 1  === half) {
    return "🟥";
  }
  if (i - 1 === half && j - 1  === half) {
    return "🟥";
  }
  if (i + 1 === half && j - 1  === half) {
    return "🟥";
  }
  if (i - 1 === half && j + 1  === half) {
    return "🟥";
  }
  return "  ";
}
function displayJunction(length) {
  const half = Math.floor(length / 2);
  let junction = "";
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      junction += getSymbol(i, j, half);
    }
    junction += "\n";
  }
  console.log(junction);
}

function start() {
  const length = 5;
  const roadOne = [[3,2]];
  const roadTwo = [];
  const roadThree = [];
  const roadFour = [];
  displayJunction(length);
}

start();