// tic tac toe = 1,-1 are players 0 is emity
const board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

function setBoard(r1, r2, r3) {
  board[0] = r1;
  board[1] = r2;
  board[2] = r3;
}

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
 * applies a  move to the board after checking it is valid
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
  console.log(`checking if player "${players[player + 1]}" has won...`);
  // checking colunms
  for (let c = 0; c < 3; c++)
    if (calcSum(0, 1, c, 0) == 3 * player) return true;

  // checking rows
  for (let r = 0; r < 3; r++)
    if (calcSum(r, 0, 0, 1) == 3 * player) return true;

  //checking diagonals
  if (calcSum(0, 1, 0, 1) == 3 * player) return true;
  if (calcSum(0, 1, 2, -1) == 3 * player) return true;
  return false;
}

function calcSum(row, rowDelta, col, colDelta) {
  //console.log("row", "col");
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    // console.log(row + rowDelta * i, col + colDelta * i);
    sum += board[row + rowDelta * i][col + colDelta * i];
  }
  return sum;
}

setBoard([1, 1, 1], [0, 0, 0], [0, 0, 0]);
printBoard(board);
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
console.assert(checkWin(-1));
//move(1, 3, -1);
/*move(2, 3, 1);
move(2, 2, -1);
move(1, 2, 1);
move(3, 1, -1);*/

//move(1, 2, 1); // TODO none should be able to move after someone has won
printBoard(board);
