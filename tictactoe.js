// These never need to change
// Note statements not in a function are run ONLY when code is first loaded

const indexes = [0, 1, 2];
const players = ["O", " ", "X"];
const USER = 1;
const AI = -1;

// Variables that are per game
// Currently only one game at a time can be active
let winner;
let lastPlayer;
let board;
let numMoves;

function startGame() {
  lastPlayer = 0; // Noone played last (yet), last player to have made a move
  winner = 0; // winner of a game
  board = [
    // tic tac toe = 1,-1 are players 0 is emity
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  numMoves = 0;
}

// ---------------------- functions that work with the board -----------------------

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

// allPaths contains a list of all possible paths for getting 3 in a row
// A path is a list of 3 [r,c] values in an array
const allPaths = [];
indexes.map((c) =>
  allPaths.push([
    [0, c],
    [1, c],
    [2, c],
  ])
);
indexes.map((r) =>
  allPaths.push([
    [r, 0],
    [r, 1],
    [r, 2],
  ])
);
allPaths.push(indexes.map((i) => [i, i]));
allPaths.push(indexes.map((i) => [i, 2 - i]));

// calculate the sum of all board locations for one path
function pathSum(path) {
  return path.reduce((s, loc) => s + board[loc[0]][loc[1]], 0);
}

// find the first location in a path whose board position is empty (has 0 value)
function findEmpty(path) {
  return path
    .map((loc) => (board[loc[0]][loc[1]] == 0 ? loc : undefined))
    .filter((loc) => loc)[0];
}
function isBoardFull() {
  return numMoves == 9;
}

// ------------------ Functions that render the board to text or HTML -------------------

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
  if (winner != 0) {
    tableContents = `Player ${players[winner + 1]} wins` + tableContents;
  }

  // One row at a time
  // for each (row,col) position generate the needed <td onclick="<function>"">X or O</td>
  for (let row = 0; row < 3; row++) {
    tableContents +=
      "\n<tr>" +
      board[row]
        .map(
          (currPlayer, col) =>
            `<td onclick="${makeMoveCall(row, col, currPlayer)}">${players[currPlayer + 1]
            }</td>`
        )
        .join(" ") +
      "</tr>";
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
    <div id="board">' +
    tableContents +
    '\n</div>\
    <form action="/">\
    <input type="submit" value="Play Again">\
    </form>\
</body>\
</html>';
  return generatedHtml;
}

// Helper function for generating function calls rendered into HTML for each board position
function makeMoveCall(row, col, currentPlayer) {
  if (winner) return "alert('GaMe OvEr')";
  if (currentPlayer == 0) {
    return `clicked(${row}, ${col})`;
  } else {
    return "alert('already taken')";
  }
}

// ---------------------- Functions for making moves and checking for winning etc -------------------

/**
 * Accepts a move from the user and applies it
 * Then gets the AI to make a move in repsonse
 * @param {*} row
 * @param {*} col
 */
function userMove(row, col) {
  move(row, col, USER);
  console.log(`user moved to ${row}, ${col}`);
  if (winner == USER || isBoardFull()) return;

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

  const neededMove = getMoveToBlockWin(USER);
  if (neededMove.length > 0) return neededMove;

  // If not make a random move
  console.log("selecting random move...");
  let row = 0;
  let col = 0;
  do {
    row = Math.floor(Math.random() * 3);
    col = Math.floor(Math.random() * 3);
    console.log(`...checking ${row}, ${col}...`);
  } while (board[row][col] != 0);
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
    console.error(
      `bad move: same player ${player} trying to move twice in a row`
    ); // TODO let's fix the error messages
  } else if (player == 0) {
    console.error("bad move: player = 0"); // TODO let's fix the error messages
  } else if (board[row][col] != 0) {
    console.error(`bad move: row=${row}, col=${col} already taken`); // TODO let's fix the error messages
    printBoard();
  } else {
    // all good
    board[row][col] = player;
    lastPlayer = player;
    numMoves++;
  }
  if (checkWin(player)) console.log(`Player ${players[player + 1]} wins`);
  // TODO lets stop anyone from playing further if someone has won
}

// checking if someone has won
// TODO simplify using paths
function checkWin(player) {
  //console.log(`checking if player "${players[player + 1]}" has won...`);
  // checking colunms
  for (let c = 0; c < 3; c++)
    if (calcSum(0, 1, c, 0) == 3 * player) {
      winner = player;
      return true;
    }
  // checking rows
  for (let r = 0; r < 3; r++)
    if (calcSum(r, 0, 0, 1) == 3 * player) {
      winner = player;
      return true;
    }
  //checking diagonals
  if (calcSum(0, 1, 0, 1) == 3 * player) {
    winner = player;
    return true;
  }
  if (calcSum(0, 1, 2, -1) == 3 * player) {
    winner = player;
    return true;
  }
  return false;
}

/**
 * Check if a player is about to win
 * Return the first location that will win so you can move there instead
 * @param {*} player
 * @returns
 */
function getMoveToBlockWin(player) {
  console.log(`checking if player "${players[player + 1]}" is about to win...`);
  let moveTo = [];
  allPaths.forEach((path) => {
    if (pathSum(path) == 2 * player) {
      moveTo = findEmpty(path);
      console.log(`AI needs to move to ${JSON.stringify(moveTo)} to block win`);
    }
  });
  return moveTo;

  /* Don't need anymore
 
  // checking colunms
  for (let c = 0; c < 3; c++) {
    const needToMove = checkSumLastZero(2 * player, 0, 1, c, 0);
    if (needToMove) return needToMove;
  }
 
  // checking rows
  for (let r = 0; r < 3; r++) {
    const needToMove = checkSumLastZero(2 * player, r, 0, 0, 1);
    if (needToMove) return needToMove;
  }
 
  //checking diagonals
  if (calcSum(0, 1, 0, 1) == 2 * player) return [1, 1];
  if (calcSum(0, 1, 2, -1) == 2 * player) return [1, 1];
  */
}

// ---------------------- TODO delete these functions soon ------------------------

// TODO remove after converting functions above to using allPaths
function calcSum(row, rowDelta, col, colDelta) {
  //console.log("row", "col");
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    // console.log(row + rowDelta * i, col + colDelta * i);
    sum += board[row + rowDelta * i][col + colDelta * i];
  }
  return sum;
}

// TODO remove after converting functions above to using allPaths
function checkSumLastZero(checkSum, row, rowDelta, col, colDelta) {
  //console.log("row", "col");
  let sum = 0;
  let open = undefined;
  for (let i = 0; i < 3; i++) {
    const r = row + rowDelta * i;
    const c = col + colDelta * i;
    // console.log(row + rowDelta * i, col + colDelta * i);
    sum += board[r][c];
    if (board[r][c] == 0) open = [r, c];
  }
  if (sum == checkSum) {
    // about to win -> return blocking move
    console.log(`AI needs to move to ${JSON.stringify(open)}`);
    return open;
  } else {
    return undefined;
  }
}

module.exports = {
  printBoard: printBoard,
  htmlBoard: htmlBoard,
  htmlPage: htmlPage,
  setBoard: setBoard,
  move: move,
  userMove: userMove,
  checkWin: checkWin,
  startGame: startGame,
};
