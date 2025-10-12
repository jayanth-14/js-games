// ===== Formatting =====
function bold(text) {
  return "\x1B[1m" + text + "\x1B[0m";
}
function custom(text, code) {
  return "\x1B[38;5;" + code + "m" + text + "\x1B[0m";
}

// ===== Custom Utilities =====
function space(lines = 1) {
  console.log("\n".repeat(lines));
}
function clear() {
  console.clear();
}
function pause(msg) {
  prompt(msg || "Press Enter to continue...");
}
function getUserNames() {
  const users = [];
  users[0] = pause("Enter User One name (⭕️) :");
  users[1] = pause("Enter User Two name (❌) :");
  return users;
}
function displayTitle(titleColor = 213, borderColor = 105) {
  const title = bold(custom(" Tic-Tac-Toe " , titleColor));
  const horizontalBorders = custom("#".repeat(15), borderColor);
  const verticalBorders = custom("#", borderColor);
  console.log("\t" + horizontalBorders);
  console.log("\t" + verticalBorders + title + verticalBorders);
  console.log("\t" + horizontalBorders);
}
function intro() {
  space();
  displayTitle();
  space();
  return getUserNames();
}
function playGame(users) {
  const board = ["⬜️","⬜️","⬜️","⬜️","⬜️","⬜️","⬜️","⬜️","⬜️"];
}
function start() {
  clear();
  const users = intro();
}

start();