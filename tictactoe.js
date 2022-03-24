// tic tac toe = 1,-1 are players 0 is emity
const board = [
  [1, 0, -1],
  [0, 0, 0],
  [0, 0, 0],
];

const players = ["X", " ", "O"];
let lastPlayer = 0;
function printBoard(b) {
  console.log(b[0].map((p) => players[p + 1]).join(" | "));
  console.log("---------");
  console.log(b[1].map((p) => players[p + 1]).join(" | "));
  console.log("---------");
  console.log(b[2].map((p) => players[p + 1]).join(" | "));
  console.log(" ");
}

function move(x, y, p) {
  if (p == lastPlayer) {
    console.log("be patient!!!");
  } else if (p == 0) {
    console.log("that's useless");
  } else if (board[x - 1][y - 1] != 0) {
    console.log("nice try");
  } else {
    // all good
    board[x - 1][y - 1] = p;
    lastPlayer = p;
  }
}

printBoard(board);
move(2, 2, -1);
move(2, 1, -1);
printBoard(board);
