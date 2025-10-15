function custom(number, code) {
  return `\x1B[${code}m` + number + `\x1B[0m`;
}
const board = [
  ["🟥", "🟥", "🟥", "🟥", "⬜️", "⬜️", "⬜️", "🟩", "🟩", "🟩", "🟩"],
  ["🟥", "  ", "  ", "🟥", "⬜️", "🟩", "🟩", "🟩", "  ", "  ", "🟩"],
  ["🟥", "  ", "  ", "🟥", "⬜️", "🟩", "⬜️", "🟩", "  ", "  ", "🟩"],
  ["🟥", "🟥", "🟥", "🟥", "⬜️", "🟩", "⬜️", "🟩", "🟩", "🟩", "🟩"],
  ["⬜️", "🟥", "⬜️", "⬜️", "⬜️", "🟩", "⬜️", "⬜️", "⬜️", "⬜️", "⬜️"],
  ["⬜️", "🟥", "🟥", "🟥", "🟥", "🟪", "🟨", "🟨", "🟨", "🟨", "⬜️"],
  ["⬜️", "⬜️", "⬜️", "⬜️", "⬜️", "🟦", "⬜️", "⬜️", "⬜️", "🟨", "⬜️"],
  ["🟦", "🟦", "🟦", "🟦", "⬜️", "🟦", "⬜️", "🟨", "🟨", "🟨", "🟨"],
  ["🟦", "  ", "  ", "🟦", "⬜️", "🟦", "⬜️", "🟨", "  ", "  ", "🟨"],
  ["🟦", "  ", "  ", "🟦", "🟦", "🟦", "⬜️", "🟨", "  ", "  ", "🟨"],
  ["🟦", "🟦", "🟦", "🟦", "⬜️", "⬜️", "⬜️", "🟨", "🟨", "🟨", "🟨"],
];

function getPlaceholder(positions, row, column, symbol) {
  const colors = ["R", "G", "Y", "B"];
  for (let i = 0; i < positions.length; i++) {
    for (let j = 0; j < positions[i].length; j++) {
      const isRowSame = positions[i][j][0] === row;
      const isColumnSame = positions[i][j][1] === column;
      if (isRowSame && isColumnSame) {
        return colors[i] + j;
      }
    }
  }
  return symbol;
}
function generateBoard(board, positions) {
  let lines = [];
  for (let row = 0; row < board.length; row++) {
    let line = "";
    for (let column = 0; column < board[row].length; column++) {
      line += getPlaceholder(positions, row, column, board[row][column]);
    }
    lines.push(line);
  }
  return lines.join("\n");
}

function start() {
  const positions = [[[1, 1], [1, 2], [2, 1], [2, 2]], [[1, 8], [1, 9], [2, 8], [2, 9]], [[8, 8], [8, 9], [9, 8], [9, 9]], [[8, 1], [8, 2], [9, 1], [9, 2]]]
  console.log(generateBoard(board, positions));
}

start()
