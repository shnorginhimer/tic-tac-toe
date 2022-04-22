const {
  printBoard,
  setBoard,
  move,
  checkWin,
  htmlBoard,
} = require("./tictactoe");

setBoard([0, 1, -1], [0, -1, 1], [-1, 0, 0]);
printBoard();
htmlBoard();
console.assert(checkWin(-1));
