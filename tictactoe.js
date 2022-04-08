// tic tac toe = 1,-1 are players 0 is emity
const board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const players = ["O", " ", "X"];
let lastPlayer = 0;

/**
 * prints board to console
 * @param {*} b
 */
function printBoard(b) {
  console.log(b[0].map((p) => players[p + 1]).join(" | "));
  console.log("---------");
  console.log(b[1].map((p) => players[p + 1]).join(" | "));
  console.log("---------");
  console.log(b[2].map((p) => players[p + 1]).join(" | "));
  console.log(" ");
}

/**
 *
 * @param {*} row
 * @param {*} col
 * @param {*} player
 */
function move(row, col, player) {
  if (player == lastPlayer) {
    console.log("be patient!!!"); // TODO let's fix the error messages
  } else if (player == 0) {
    console.log("that's useless"); // TODO let's fix the error messages
  } else if (board[row - 1][col - 1] != 0) {
    console.log("nice try"); // TODO let's fix the error messages
  } else {
    // all good
    board[row - 1][col - 1] = player;
    lastPlayer = player;
  }
  if (checkWin(player)) console.log(`Player ${players[player + 1]} wins`);
  // TODO lets stop anyone from playing further if someone has won
}

// checking if someone has won
function checkWin(player) {
  console.log(`checking if ${player} has won...`);
  // checking colunms
  for (let c = 0; c < 3; c++) {
    let sum = 0;
    for (let r = 0; r < 3; r++) {
      sum += board[r][c];
    }
    if (sum == 3 * player) return true;
  }
  // checking rows
  for (let r = 0; r < 3; r++) {
    let sum = 0;
    for (let c = 0; c < 3; c++) {
      sum += board[r][c];
    }
    if (sum == 3 * player) return true;
  }
  //checking diagonals
  let sum = 0;
  for (let rc = 0; rc < 3; rc++) {
    sum += board[rc][rc];
  }
  if (sum == 3 * player) return true;
  sum = 0;
  for (let rc = 0; rc < 3; rc++) {
    sum += board[rc][2 - rc];
  }
  if (sum == 3 * player) return true;
}

printBoard(board);
move(3, 1, -1);
move(2, 3, 1);
move(3, 2, -1);
move(1, 3, 1);
move(3, 3, -1);
move(1, 2, 1); // TODO noone should be able to move after someone has won
printBoard(board);
