const { printBoard, setBoard, move, checkWin } = require("./tictactoe");

setBoard([1, 1, 1], [0, 0, 0], [0, 0, 0]);
printBoard();
console.assert(checkWin(1));

// TODO sandy change all these into tests that can all run without editing
/*move(3, 1, -1);
move(2, 3, 1);
move(3, 2, -1);
move(1, 3, 1);
move(3, 3, -1);*/

/*move(1, 1, -1);
move(2, 3, 1);
move(1, 2, -1);
move(2, 2, 1);
move(1, 3, -1);*/

/*move(2, 1, -1);
move(1, 3, 1);
move(2, 2, -1);
move(1, 2, 1);
move(2, 3, -1);*/

setBoard([0, 1, -1], [0, -1, 1], [-1, 0, 0]);
printBoard();
console.assert(checkWin(-1));
//move(1, 3, -1);
/*move(2, 3, 1);
move(2, 2, -1);
move(1, 2, 1);
move(3, 1, -1);*/

//move(1, 2, 1); // TODO none should be able to move after someone has won
