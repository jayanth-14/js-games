const WIN_SETS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const SYMBOLS = ["❌","⭕️"];
// ===== Formatting =====
function bold(text) {
  return "\x1B[1m" + text + "\x1B[0m";
}
function custom(text, code) {
  return "\x1B[38;5;" + code + "m" + text + "\x1B[0m";
}
function yellow(text) {
  return "\x1B[33m" + text + "\x1B[0m";
}

// ===== Custom Utilities =====
function space(lines = 1) {
  console.log("\n".repeat(lines));
}
function clear() {
  console.clear();
}
function pause(msg) {
  return prompt(msg || "Press Enter to continue...");
}
function getUserNames() {
  const users = [];
  users.push(pause("Enter User One name (❌) :"));
  users.push(pause("Enter User Two name (⭕️) :"));
  return users;
}
function displayTitle(title, titleColor = 213, borderColor = 105) {
  const titleString = bold(custom(title, titleColor));
  const horizontalBorders = custom("#".repeat(title.length + 2), borderColor);
  const verticalBorders = custom("#", borderColor);
  console.log("\t" + horizontalBorders);
  console.log("\t" + verticalBorders + titleString + verticalBorders);
  console.log("\t" + horizontalBorders);
}
function intro() {
  space();
  displayTitle(" Tic-Tac-Toe ",);
  space();
  return getUserNames();
}
function isGameWon(board, symbol) {
  for (let index = 0; index < WIN_SETS.length; index++) {
    const set = WIN_SETS[index];
    const isFirstSame = board[set[0]] === symbol;
    const isSecondSame = board[set[1]] === symbol;
    const isThirdSame = board[set[2]] === symbol;
    if (isFirstSame && isSecondSame && isThirdSame) {
      return true;
    }
  }
  return false;
}
function isRowEnd(itemIndex) {
  return itemIndex % 3 === 2;
}
function displayBoard(board) {
  let stringBoard = '\t';
  for (let index = 0; index < board.length; index++) {
    let item = board[index];
    item += isRowEnd(index) ? "\n\t" : "";
    stringBoard += item;
  }
  clear();
  space();
  console.log(stringBoard);
}
function isValid(choice, board) {
  const numbers = '0123456789';
  for (let index = 0; index < choice.length; index++) {
    if (!numbers.includes(choice[index])) {
      return false;
    }
  }
  const position = parseInt(choice);
  return position > 0 && position < 10 && board[position - 1] === "⬜️";
}
function displayGameResults(isWin, lastUser) {
  if (isWin) {
    return displayTitle(" It's " + lastUser + "'s Win ");
  }
  displayTitle(" It's a DRAW!!! ");
}
function gameEnd(board, users, lastUser, isWin) {
  displayBoard(board);
  displayGameResults(isWin, lastUser);
  const continuing = confirm("Do you want to continue : ");
  if (continuing) {
    return playGame(users);
  }
}
function playGame(users) {
  const board = ["⬜️", "⬜️", "⬜️", "⬜️", "⬜️", "⬜️", "⬜️", "⬜️", "⬜️"];
  let isOver = false;
  let isWin = false;
  let gameCount = 0;
  while (!isWin && !isOver) {
    displayBoard(board);
    gameCount = gameCount % 2;
    const currentUser = users[gameCount];
    const currentSymbol = SYMBOLS[gameCount];
    const choice = pause(currentUser + ", please Enter your choice (1 - 9) : ");
    if (!isValid(choice, board)) {
      console.log(yellow("Please choose a valid position!!!"));
      pause();
      continue;
    }
    board[choice - 1] = currentSymbol;
    isWin = isGameWon(board, currentSymbol)
    isOver = !board.includes("⬜️");;
    gameCount = gameCount + 1;
  }
  gameEnd(board, users, users[(gameCount + 1) % 2], isWin)
}
function start() {
  clear();
  const users = intro();
  playGame(users);
}

start();