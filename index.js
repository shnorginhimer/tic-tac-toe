const { printBoard, setBoard, move, checkWin } = require("./tictactoe");

setBoard([0, 1, -1], [0, -1, 1], [-1, 0, 0]);
printBoard();
console.assert(checkWin(-1));
