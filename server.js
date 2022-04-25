const express = require('express');
const path = require('path');
const app = express();
const port = 80;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/ui.html"));
});

app.get('/styles.css', function (req, res) {
    res.sendFile(path.join(__dirname, "/styles.css"));
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

app.post('/game/:gameId/moves', function (req, res) {
    res.send(`Making move ${req.body} for game: ${req.params.gameId}`);
});

app.listen(port, function () {
    console.log(`Tictactoe server listening on port ${port}!`)
});