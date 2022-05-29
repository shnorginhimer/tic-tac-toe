function clicked(r, c) {
    console.log(`sending move at (${r}, ${c}) to backend...`);
    postMoveNewBoard(r, c);
    //alert(`clicked location (${r}, ${c})`);
}

function postMoveNewBoard(r, c) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./game/1/moves", true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // setup function to handle response
    xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfully
                console.log(`Updating table element to ${xhr.responseText}`);
                document.getElementById('board').innerHTML = xhr.responseText;
            } else {
                console.error("Failed XHR request");
            }
        }
    };

    // now send
    xhr.send(JSON.stringify({
        row: r,
        col: c
    }));
}

