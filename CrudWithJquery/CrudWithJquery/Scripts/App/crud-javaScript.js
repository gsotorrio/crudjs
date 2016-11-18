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

function putPlayerInTable(player) {
    var table = window.document.getElementById("tbPlayers");

    var trNew = table.insertRow(0);

    var playerId = trNew.insertCell(-1);
    var name = trNew.insertCell(0);
    var surname = trNew.insertCell(1);
    var position = trNew.insertCell(2);
    var strongLeg = trNew.insertCell(3);
    var age = trNew.insertCell(4);
    var playerNumber = trNew.insertCell(5);
    var tdDelete = trNew.insertCell(6);
    var tdUpdate = trNew.insertCell(7);

   

    playerId.style.visibility = "hidden";

    window.document.getElementById("name").innetHTML = player.name;
    window.document.getElementById("surname").innetHTML = player.surname;
    window.document.getElementById("position").innetHTML = player.position;
    window.document.getElementById("strongLeg").innetHTML = player.strongLeg;
    window.document.getElementById("age").innetHTML = player.age;
    window.document.getElementById("number").innetHTML = player.playerNumber;
    
}


ajax("GET", "http://localhost:13503/api/players", null, function (players) {
    console.log(players);

    for (var i = 0; i < players.length; i++) {
        putPlayerInTable(players);
    }
});



