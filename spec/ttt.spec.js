const { printBoard, setBoard, move, checkWin } = require("../tictactoe");

describe("Checking winners on various board setups", function () {
  it("checks that three Xs in a row wins", function () {
    setBoard([1, 1, 1], [0, 0, 0], [0, 0, 0]);
    expect(checkWin(1)).toBe(true);
  });
  it("Checking that three Os on diagonal wins", function () {
    setBoard([0, 1, -1], [0, -1, 1], [-1, 0, 0]);
    expect(checkWin(-1)).toBe(true);
  });
});

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
