const BOARD = [10, 10];
// ===== Formatting =====
function bold(text) {
  return "\x1B[1m" + text + "\x1B[0m";
}
function customBg(text, code) {
  return "\x1B[48;5;" + code + "m" + text + "\x1B[0m";
}
function custom(text, code) {
  return "\x1B[38;5;" + code + "m" + text + "\x1B[0m";
}
function yellow(text) {
  return "\x1B[33m" + text + "\x1B[0m";
}
function getSnakeColumns(row, snakeX, snakeY) {
  const columns = [];
  for (let index = 0; index < snakeX.length; index++) {
    if (snakeX[index] === row) {
      columns.push(snakeY[index]);
    }
  }
  return columns;
}
function generateBoard(snakeX, snakeY, fruit) {
  let boardString = "\t";
  for (let row = 0; row < BOARD[0]; row++) {
    const snakePresentColumns = getSnakeColumns(row, snakeX, snakeY);
    for (let column = 0; column < BOARD[1]; column++) {
      if (row === fruit[0] && column === fruit[1]) {
        boardString += "🍎";
        continue;
      }
      boardString += snakePresentColumns.includes(column) ? "🟩" : "⬜️";
    }
    boardString += "\n\t";
  }
  return boardString;
}
function space(lines = 1) {
  console.log("\n".repeat(lines));
}
function clear() {
  console.clear();
}
function displayTitle(title, titleColor = 213, borderColor = 33) {
  const titleString = bold(custom(title, titleColor));
  const horizontalBorders = customBg(" ".repeat(title.length + 2), borderColor);
  const verticalBorders = customBg(" ", borderColor);
  console.log("\t" + horizontalBorders);
  console.log("\t" + verticalBorders + titleString + verticalBorders);
  console.log("\t" + horizontalBorders);
}
function colided(snakeX, snakeY) {
  return (snakeX[0] === 0 || snakeX[0] === BOARD[0]) || (snakeY[0] === 0 || snakeY[0] === BOARD[0])
}
function updateRows(rows, modifier) {
  rows.unshift(rows[0] + modifier);
  rows.pop();
}
function updateColumns(columns, modifier) {
  columns.unshift(columns[0] + modifier);
  columns.pop();
}
function askDirection() {
  const input = prompt("Enter direction (w ⬆️, a ⬅️, s ⬇️, d ➡️ :");
  switch (input) {
    case "w": return [-1, 0];
    case "s": return [1, 0];
    case "a": return [0, -1];
    case "d": return [0, 1];
    default: console.log(yellow("Entered invalid option!!!"));
      return [0, 0];
  }
}
function newFruit(fruit) {
  if (fruit.length === 0) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  }
  return fruit;
}
function start() {
  displayTitle(" 🐉 GROW YOUR DRAGON 🐉 ");
  space();
  const snakeX = [5, 5, 4, 3];
  const snakeY = [5, 6, 6, 6];
  let isCollided = false;
  let modifiers = [-1, 0];
  let fruit = [5, 5];
  while (!isCollided) {
    clear();
    space();
    fruit = newFruit(fruit);
    const board = generateBoard(snakeX, snakeY, fruit);
    console.log(board);
    modifiers = askDirection(modifiers);
    updateRows(snakeX, modifiers[0], fruit);
    updateColumns(snakeY, modifiers[1], fruit);
    // for (let index = 0; index < 100000000; index++)÷
    isCollided = colided(snakeX, snakeY);
  }
}

start();