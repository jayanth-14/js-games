function custom(number, code) {
  return `\x1B[${code}m` + number + `\x1B[0m`;
}
const board = `
🟥🟥🟥🟥⬜️⬜️⬜️🟩🟩🟩🟩
🟥${custom("1 ", 41) + custom("2 ", 41)}🟥⬜️🟩🟩🟩${custom("1 ", 42) + custom("2 ", 42)}🟩
🟥${custom("3 ", 41) + custom("4 ", 41)}🟥⬜️🟩⬜️🟩${custom("3 ", 42) + custom("4 ", 42)}🟩
🟥🟥🟥🟥⬜️🟩⬜️🟩🟩🟩🟩
⬜️🟥⬜️⬜️⬜️🟩⬜️⬜️⬜️⬜️⬜️
⬜️🟥🟥🟥🟥🟪🟨🟨🟨🟨⬜️
⬜️⬜️⬜️⬜️⬜️🟦⬜️⬜️⬜️🟨⬜️
🟦🟦🟦🟦⬜️🟦⬜️🟨🟨🟨🟨
🟦${custom("1 ", 44) + custom("2 ", 44)}🟦⬜️🟦⬜️🟨${custom("1 ", 43) + custom("2 ", 43)}🟨
🟦${custom("3 ", 44) + custom("4 ", 44)}🟦🟦🟦⬜️🟨${custom("3 ", 43) + custom("4 ", 43)}🟨
🟦🟦🟦🟦⬜️⬜️⬜️🟨🟨🟨🟨
`;
console.log(board);
