const {
  printBoard,
  setBoard,
  move,
  checkWin,
  htmlBoard,
  userMove
} = require("./tictactoe");

setBoard([0, 1, 1], [0, 0, 0], [-1, 0, 0]);

userMove(2, 2);
printBoard();
console.log(htmlBoard());
// console.assert(checkWin(-1));
