const {
  printBoard,
  userMove,
  startGame,
  findWinningMove
} = require("./tictactoe");

startGame();

userMove(1, 1);
userMove(2, 2);
printBoard();

console.log(findWinningMove(1)); // should return [0,2] or [2,0]

