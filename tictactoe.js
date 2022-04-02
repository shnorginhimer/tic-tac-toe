// tic tac toe = 1,-1 are players 0 is emity
const board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const players = ["X", " ", "O"];
let lastPlayer = 0;

// prints board to console
function printBoard(b) {
  console.log(b[0].map((p) => players[p + 1]).join(" | "));
  console.log("---------");
  console.log(b[1].map((p) => players[p + 1]).join(" | "));
  console.log("---------");
  console.log(b[2].map((p) => players[p + 1]).join(" | "));
  console.log(" ");
}

// add move if valid
function move(y, x, p) {
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
  if (checkWin(p)) console.log(`${p} wins`);
}

// checking if someone has won
function checkWin(player) {
  console.log(`checking if ${player} has won...`);
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    sum += board[0][i];
  }
  if (sum == 3 * player) {
    return true;
  } else {
    return false;
  }
}

printBoard(board);
move(3, 1, -1);
move(2, 3, 1);
move(2, 1, -1);
move(3, 2, 1);
move(1, 1, -1);
move(1, 2, 1);
printBoard(board);
