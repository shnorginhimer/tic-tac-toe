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
function printBoard() {
  console.log(board[0].map((p) => players[p + 1]).join(" | "));
  console.log("---------");
  console.log(board[1].map((p) => players[p + 1]).join(" | "));
  console.log("---------");
  console.log(board[2].map((p) => players[p + 1]).join(" | "));
  console.log(" ");
}

/**
 * prints board to console
 * @param {*} b
 */
function htmlBoard() {
  // Build up the board HTML table element
  let tableContents = "";

  // One row at a time
  for (let row = 0; row < 3; row++) {
    tableContents +=
      ("\n<tr>" +
        board[row].map( // for each (row,col) position generate the needed <td onclick="<function>"">X or O</td>
          (currPlayer, col) => `<td onclick="${makeMoveCall(row, col, currPlayer)
            }">${players[currPlayer + 1]}</td>`
        ).join(" ") +
        "</tr>");
  }

  let generatedHtml =
    '<html>\
  <head>\
    <title>tictactoe game</title>\
  <link rel="stylesheet" href="styles.css" />\
  <script type="text/javascript" src="ui.js"></script>\
    </head>\
    <body>\
    <h1>tictactoe game</h1>\
    <table>'
    + tableContents +
    '\n</table>\
  <input type="restart" value="restart">\
</body>\
</html>';
  return generatedHtml;
}

function makeMoveCall(row, col, currentPlayer) {
  if (currentPlayer == 0) {
    return `clicked(${row + 1}, ${col + 1})`;
  } else {
    return "alert('already taken')";
  }
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
  //console.log(`checking if player "${players[player + 1]}" has won...`);
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

module.exports = {
  printBoard: printBoard,
  htmlBoard: htmlBoard,
  setBoard: setBoard,
  move: move,
  checkWin: checkWin,
};
