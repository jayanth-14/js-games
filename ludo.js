const BOARD = [
  //0     1     2    3     4    5     6    7     8    9    10
  ["🟥", "🟥", "🟥", "🟥", "⬜️", "⬜️", "⬜️", "🟩", "🟩", "🟩", "🟩"], // 0
  ["🟥", "  ", "  ", "🟥", "⬜️", "🟩", "🟩", "🟩", "  ", "  ", "🟩"], //1
  ["🟥", "  ", "  ", "🟥", "⬜️", "🟩", "⬜️", "🟩", "  ", "  ", "🟩"], // 2
  ["🟥", "🟥", "🟥", "🟥", "⬜️", "🟩", "⬜️", "🟩", "🟩", "🟩", "🟩"], // 3
  ["⬜️", "🟥", "⬜️", "⬜️", "⬜️", "🟩", "⬜️", "⬜️", "⬜️", "⬜️", "⬜️"], // 4
  ["⬜️", "🟥", "🟥", "🟥", "🟥", "🟪", "🟨", "🟨", "🟨", "🟨", "⬜️"], // 5
  ["⬜️", "⬜️", "⬜️", "⬜️", "⬜️", "🟦", "⬜️", "⬜️", "⬜️", "🟨", "⬜️"], // 6
  ["🟦", "🟦", "🟦", "🟦", "⬜️", "🟦", "⬜️", "🟨", "🟨", "🟨", "🟨"], // 7
  ["🟦", "  ", "  ", "🟦", "⬜️", "🟦", "⬜️", "🟨", "  ", "  ", "🟨"], // 8
  ["🟦", "  ", "  ", "🟦", "🟦", "🟦", "⬜️", "🟨", "  ", "  ", "🟨"], // 9
  ["🟦", "🟦", "🟦", "🟦", "⬜️", "⬜️", "⬜️", "🟨", "🟨", "🟨", "🟨"], // 10
];

const RED_PATH = [
  [4, 1],
  [4, 2],
  [4, 3],
  [4, 4],
  [3, 4],
  [2, 4],
  [1, 4],
  [0, 4],
  [0, 5],
  [0, 6],
  [1, 6],
  [2, 6],
  [3, 6],
  [4, 6],
  [4, 7],
  [4, 8],
  [4, 9],
  [4, 10],
  [5, 10],
  [6, 10],
  [6, 9],
  [6, 8],
  [6, 7],
  [6, 6],
  [7, 6],
  [8, 6],
  [9, 6],
  [10, 6],
  [10, 5],
  [10, 4],
  [9, 4],
  [8, 4],
  [7, 4],
  [6, 4],
  [6, 3],
  [6, 2],
  [6, 1],
  [6, 0],
  [5, 0],
  [5, 1],
  [5, 2],
  [5, 3],
  [5, 4],
  [5, 5],
];

const START = [[4, 1], [1, 6], [9, 5], [6, 10]];
function custom(number, code) {
  return `\x1B[${code}m` + number + `\x1B[0m`;
}
function getPlaceholder(positions, row, column, symbol) {
  const colors = ["R", "G", "Y", "B"];
  for (let i = 0; i < positions.length; i++) {
    for (let j = 0; j < positions[i].length; j++) {
      const isRowSame = positions[i][j][0] === row;
      const isColumnSame = positions[i][j][1] === column;
      if (isRowSame && isColumnSame) {
        return custom(colors[i] + j, 9);
      }
    }
  }
  return symbol;
}
function generateBoard(board, positions, paths) {
  const symbol = ["R", "G", "Y", "B"]; // red, green, yellow, blue
  const colors = [9, 10, 11, 12];
  const lines = [];

  for (let row = 0; row < board.length; row++) {
    let line = "";

    for (let column = 0; column < board[row].length; column++) {
      let cell = board[row][column];

      for (let player = 0; player < positions.length; player++) {
        for (let coin = 0; coin < positions[player].length; coin++) {
          const index = positions[player][coin];
          if (index < 0 || index > paths[player].length) {
            continue;
          }
          const positionReference = paths[player][index];
          if (positionReference[0] === row && positionReference[1] === column) {
            cell = custom(symbol[player] + coin, colors[player]);
          }
        }
      }
      line += cell;
    }

    lines.push(line);
  }
  return lines.join("\n");
}

function displayBoard(board, positions) {
  console.clear();
  console.log(generateBoard(board, positions, [RED_PATH]));
}
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}
function askUser() {
  prompt("Press enter to roll dice.");
  return rollDice();
}
function start() {
  const positions = [[-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [
    -1,
    -1,
    -1,
    -1,
  ]];
  let isGameOver = false;
  let player = 0;
  while (!isGameOver) {
    displayBoard(BOARD, positions);
    const dice = askUser();
    positions[0][0] += dice;
    player = (player + 1) % 4;
    isGameOver = player > 5;
  }
}

start();
