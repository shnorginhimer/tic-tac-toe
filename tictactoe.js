// tic tac toe = 1,-1 are players 0 is emity
const board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
const players = ["O", " ", "X"];
const USER = 1
const AI = -1;
let lastPlayer = 0;

/**
 * Setup the board to a specific starting position
 * @param {*} r1 
 * @param {*} r2 
 * @param {*} r3 
 */
function setBoard(r1, r2, r3) {
  board[0] = r1;
  board[1] = r2;
  board[2] = r3;
}

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
 * converts board into the body of an HTML table with the needed events hooked up
 * @param {*} b
 */
function htmlBoard() {
  // Build up the board HTML table element
  let tableContents = "<table>";

  // One row at a time
  // for each (row,col) position generate the needed <td onclick="<function>"">X or O</td>
  for (let row = 0; row < 3; row++) {
    tableContents +=
      ("\n<tr>" + board[row].map((currPlayer, col) => `<td onclick="${makeMoveCall(row, col, currPlayer)}">${players[currPlayer + 1]}</td>`).join(" ") +
        "</tr>");
  }
  tableContents += "\n</table>";

  return tableContents;
}

/**
 * creates full HTML page for game
 * @param {*} b
 */
function htmlPage() {
  const tableContents = htmlBoard();
  let generatedHtml =
    '<html>\
  <head>\
    <title>tictactoe game</title>\
  <link rel="stylesheet" href="styles.css" />\
  <script type="text/javascript" src="ui.js"></script>\
    </head>\
    <body>\
    <h1>tictactoe game</h1>\
    <div id="board">'
    + tableContents +
    '\n</div>\
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
 * Accepts a move from the user and applies it
 * Then gets the AI to make a move in repsonse
 * @param {*} row 
 * @param {*} col 
 */
function userMove(row, col) {
  move(row, col, USER);
  console.log(`user moved to ${row}, ${col}`);
  const [aiRow, aiCol] = aiDecideMove();
  move(aiRow, aiCol, AI);
  console.log(`AI moved to ${aiRow}, ${aiCol}`);
}

/**
 * Figure out what move the AI should make
 * @returns 
 */
function aiDecideMove() {
  // Check if user about to win
  const neededMove = checkAboutToWin(USER);
  if (neededMove) return neededMove;

  // If not make a random move
  const row = Math.floor(Math.random() * 3) + 1;
  const col = Math.floor(Math.random() * 3) + 1;
  console.log(`AI moving to ${row}, ${col}`);
  return [row, col];
}

/**
 * applies a  move to the board after checking it is valid
 * @param {*} row
 * @param {*} col
 * @param {*} player
 */
function move(row, col, player) {
  if (player == lastPlayer) {
    console.error(`bad move: same player ${player} trying to move twice in a row`); // TODO let's fix the error messages
  } else if (player == 0) {
    console.error("bad move: player = 0"); // TODO let's fix the error messages
  } else if (board[row - 1][col - 1] != 0) {
    console.error(`bad move: row=${row}, col=${col} already taken`); // TODO let's fix the error messages
    printBoard();
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

/**
 * Check if a player is about to win
 * Return the first location that will win so you can move there instead
 * @param {*} player 
 * @returns 
 */
function checkAboutToWin(player) {
  console.log(`checking if player "${players[player + 1]}" is about to win...`);
  // checking colunms
  for (let c = 0; c < 3; c++)
    if (calcSum(0, 1, c, 0) == 2 * player) {
      for (let r = 0; r < 3; r++) {
        if (board[r, c] == 0) return [r, c]
      }
      console.error("oops shouldn't get here");
    }

  // checking rows
  for (let r = 0; r < 3; r++)
    if (calcSum(r, 0, 0, 1) == 2 * player) return [1, 1];

  //checking diagonals
  if (calcSum(0, 1, 0, 1) == 2 * player) return [1, 1];
  if (calcSum(0, 1, 2, -1) == 2 * player) return [1, 1];
  return [3, 3];
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
  htmlPage: htmlPage,
  setBoard: setBoard,
  move: move,
  userMove: userMove,
  checkWin: checkWin,
};
