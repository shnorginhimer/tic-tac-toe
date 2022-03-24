// tic tac toe = 1,-1 are players 0 is emity
const board = [
  [1, 0, -1],
  [0, 0, 0],
  [0, 0, 0],
];

const players = ["X", " ", "O"];

function printBoard(b) {
  console.log(b[0].map((p) => players[p + 1]).join(" | "));
  console.log("---------");
  console.log(b[1].map((p) => players[p + 1]).join(" | "));
  console.log("---------");
  console.log(b[2].map((p) => players[p + 1]).join(" | "));
  console.log(" ");
}

function move(x, y, p) {
  board[x - 1][y - 1] = p;
}

printBoard(board);
move(2, 2, -1);
printBoard(board);
