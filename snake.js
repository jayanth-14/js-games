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
function generateBoard(snakeX, snakeY) {
  let boardString = "\t";
  for (let row = 0; row < BOARD[0]; row++) {
    for (let column = 0; column < BOARD[1]; column++) {
      const isSnakePresent = snakeY.includes(column) && snakeX.includes(row);
      boardString += isSnakePresent  ? "🟩" : "⬜️";
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
  const snakeX = [5, 5];
  const snakeY = [5, 6];
  let isCollided = false;
  let i = 0;
  while (!isCollided) {
    const board = generateBoard(snakeX, snakeY);
    console.log(board);
    isCollided = i++ < 10;
  }
}

start();