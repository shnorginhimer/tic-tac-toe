function clicked(r, c) {
    console.log(`sending move at (${r}, ${c}) to backend...`);
    postMoveNewBoard(r, c);
    //alert(`clicked location (${r}, ${c})`);
}

function postMoveNewBoard(r, c) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./game/1/moves", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        row: r,
        col: c
    }));
}

