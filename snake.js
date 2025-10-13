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
function generateBoard(snakeX, snakeY) {
  let boardString = "\t";
  for (let row = 0; row < BOARD[0]; row++) {
    const snakePresentColumns = getSnakeColumns(row, snakeX, snakeY);
    for (let column = 0; column < BOARD[1]; column++) {
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
function start() {
  displayTitle(" 🐉 GROW YOUR DRAGON 🐉 ");
  space();
  const snakeX = [5, 5, 4 ,3];
  const snakeY = [5, 6, 6, 6];
  let isCollided = false;
  let i = 0;
  while (!isCollided) {
    const board = generateBoard(snakeX, snakeY);
    console.log(board);
    isCollided = i++ < 10;
  }
}

start();