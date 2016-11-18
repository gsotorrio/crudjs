function ajax(method, url, jsonData, callback) {

    var httpRequest;

    if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 6 and older
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }

    httpRequest.onreadystatechange = function () {

        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                var responseJson = JSON.parse(httpRequest.responseText);
                callback(responseJson);
            } else {
                console.log("An error occurred during your request: " + httpRequest.status + " " + httpRequest.statusText);
            }
        }
    }

    httpRequest.open(method, url, true);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    
    if (jsonData) {
        var strData = JSON.stringify(jsonData);
        httpRequest.send(strData);
    } else {
        httpRequest.send(null);
    }
}

function putNewPlayerInTable(player) {
    window.document.getElementById("dynamicTr").innerHTML =
        "<tr id='" + player.playerId + "'><td class='hideId'>"
        + player.playerId +
        "</td><td>"
        + player.name +
        "</td><td>"
        + player.surname +
        "</td><td>"
        + player.position +
        "</td><td>"
        + player.strongLeg +
        "</td><td>"
        + player.age +
        "</td><td>"
        + player.playerNumber +
        "</td><td><a href='#' class='delete'>Delete</a></td><td><a href='#' class='update'>Update</a></td></tr>";

    return(window.document.getElementById("dynamicTr").innerHTML);
}

ajax("GET", "http://localhost:13503/api/players", null, function (players) {
    console.log(players);

    var savePlayersForTable = "";
    
    for (var i = 0; i < players.length; i++) {
        savePlayersForTable += putNewPlayerInTable(players[i]);
    }
    window.document.getElementById("dynamicTr").innerHTML = savePlayersForTable;
});


