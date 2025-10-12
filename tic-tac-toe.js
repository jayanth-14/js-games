const WIN_SETS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const SYMBOLS = ["❌", "⭕️"];
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

// ===== Bot Logic =====
function isOccupied(board, position) {
  return board[position] !== "⬜️";
}
function generatePosition(board) {
  while (true) {
    const randomIndex = Math.floor(Math.random() * 9);
    if (isOccupied(board, randomIndex)) {
      continue;
    }
    return randomIndex;
  }
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
function askMode() {
  console.log("Who do you want to lose against today ? 😏");
  console.log("1. Computer 💻 (good luck)");
  console.log("2. Friend 🙍‍♂️ (good luck anyway)");
  const option = pause("Enter The mode You want to play : ");
  if (!["1", "2"].includes(option)) {
    console.log(yellow("Please enter a valid mode : "));
    pause();
    return start();
  }
  return option;
}

function intro() {
  space();
  displayTitle(" Tic-Tac-Toe ",);
  space();
  const mode = askMode();
  space();
  if (mode === "2") {
    return getUserNames();
  }
  return [pause("Enter User's name (❌) :")];
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
function displayGameResults(isWin, users, lastUser) {
  if (isWin) {
    const user = users.length === 2 || lastUser !== undefined ? lastUser : "Computer";
    return displayTitle(" It's " + user + "'s Win ");
  }
  displayTitle(" It's a DRAW!!! ");
}
function gameEnd(board, users, lastUser, isWin) {
  displayBoard(board);
  displayGameResults(isWin, users, lastUser);
  const continuing = confirm("Do you want to continue : ");
  if (continuing) {
    return playGame(users);
  }
}
function alertInvalidPosition() {
  console.log(yellow("Please choose a valid position!!!"));
  pause();
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
    if (currentUser !== undefined) {
      const choice = pause(currentUser + ", please Enter your choice (1 - 9) : ");
      if (!isValid(choice, board)) {
        alertInvalidPosition();
        continue;
      }
      board[choice - 1] = currentSymbol;
    } else {
      const choice = generatePosition(board);
      board[choice] = currentSymbol;
    }
    isWin = isGameWon(board, currentSymbol)
    isOver = !board.includes("⬜️");;
    gameCount = gameCount + 1;
  }
  gameEnd(board, users, users[(gameCount + 1) % 2], isWin)
}
function start() {
  clear();
  const users = intro();
  const isComputerMode = users.length === 1;
  playGame(users, isComputerMode);
}

start();