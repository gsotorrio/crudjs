function ajax(method, url, jsonData, callback) {

    var httpRequest;

    if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 6 and older
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }

    httpRequest.onreadystatechange = function () {

        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200 || httpRequest.status === 201 || httpRequest.status === 204) {
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

function createTrPlayer(player) {
    return(
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
        "</td><td><a href='#' class='delete' onclick='deleteOneplayer(this);'>Delete</a></td><td><a href='#' class='update'>Update</a></td></tr>");
}

function deleteOneplayer(anchor) {
    var id = anchor.parentElement.parentElement.id;

    ajax("DELETE", "http://localhost:13503/api/players" + id, null, function () { });
}

ajax("GET", "http://localhost:13503/api/players", null, function (players) {
    console.log(players);

    var savePlayersForTable = "";
    
    for (var i = 0; i < players.length; i++) {
        savePlayersForTable += createTrPlayer(players[i]);
    }
    window.document.getElementById("dynamicTr").innerHTML = savePlayersForTable;
});

function cleanFormulary() {
    window.document.getElementById("nameFormulay").value = "";
    window.document.getElementById("surnameFormulay").value = "";
    window.document.getElementById("positionFormulay").value = "";
    window.document.getElementById("strongLegFormulay").value = "";
    window.document.getElementById("ageFormulay").value = "";
    window.document.getElementById("numberFormulay").value = "";
}

function createNewPlayer() {

    ajax("POST", "http://localhost:13503/api/players", {
        "name": window.document.getElementById("nameFormulay").value,
        "surname": window.document.getElementById("surnameFormulay").value,
        "position": window.document.getElementById("positionFormulay").value,
        "strongLeg": window.document.getElementById("strongLegFormulay").value,
        "age": window.document.getElementById("ageFormulay").value,
        "playerNumber": window.document.getElementById("numberFormulay").value
    }, function (player) {
        var playersInTable = window.document.getElementById("dynamicTr").innerHTML;

        window.document.getElementById("dynamicTr").innerHTML = playersInTable + createTrPlayer(player);
       
        cleanFormulary();
    });
}