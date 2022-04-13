const { printBoard, setBoard, move, checkWin } = require("../tictactoe");

describe("Checking winners on various board setups", function () {
    it("Checking that three Xs in a row win", function () {
        setBoard([1, 1, 1], [0, 0, 0], [0, 0, 0]);
        expect(checkWin(1)).toBe(true);
    });
    it("Checking that three Os on diagonal wins", function () {
        setBoard([0, 1, -1], [0, -1, 1], [-1, 0, 0]);
        expect(checkWin(-1)).toBe(true);
    });
});