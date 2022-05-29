const {
    printBoard,
    setBoard,
    userMove,
    checkWin,
    htmlBoard,
    htmlPage,
} = require("./tictactoe");

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

console.log("Initializing application...");

const app = express();
app.use(bodyParser.json())
const port = 80;

app.get('/', function (req, res) {
    setBoard([0, 0, 0], [0, 0, 0], [0, 0, 0]);
    res.setHeader('content-type', 'text/html');
    res.send(htmlPage());
    // res.sendFile(path.join(__dirname, "/ui.html"));
});

app.get('/ui', function (req, res) {
    res.sendFile(path.join(__dirname, "/ui.html"));
});

app.get('/styles.css', function (req, res) {
    res.sendFile(path.join(__dirname, "/styles.css"));
});
app.get('/ui.js', function (req, res) {
    res.sendFile(path.join(__dirname, "/ui.js"));
});
// TODO do this with an SVG icon https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs
/* app.get('/favicon.ico', function (req, res) {
    res.sendFile(path.join(__dirname, "/favicon.ico"));
});*/

app.post('/game/:gameId/moves', function (req, res) {
    console.log(`received move ${JSON.stringify(req.body)} for game ${req.params.gameId}`);
    // console.log("headers:", JSON.stringify(req.headers));

    // make the move (and the system moves also)
    userMove(req.body.row, req.body.col);

    // return the new board
    res.send(htmlBoard());
});

// Below not working yet...

app.get('/games', function (req, res) {
    res.send('Getting a list of games')
});

app.get('/games/:gameId', function (req, res) {
    res.send(`Getting board for game: ${req.params.gameId}`)
});

app.get('/game/:gameId/moves', function (req, res) {
    res.send(`Getting list of moves in game: ${req.params.gameId}`);
});

app.listen(port, function () {
    console.log(`Tictactoe server listening on port ${port}!`)
});