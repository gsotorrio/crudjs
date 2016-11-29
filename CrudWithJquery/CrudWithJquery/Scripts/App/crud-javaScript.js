﻿function ajax(method, url, jsonData, callback) {

    var httpRequest;

    if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 6 and older
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }

    httpRequest.onreadystatechange = function () {

        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200 || httpRequest.status === 201 || httpRequest.status === 204) {
                if (httpRequest.responseText) {
                    var responseJson = JSON.parse(httpRequest.responseText);
                    callback(responseJson);
                } else {
                    callback();
                }
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
        "</td><td class='name'>"
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
        "</td><td><a href='#' class='delete' onclick='deleteOnePlayer(this);'>Delete</a></td><td><a href='#' class='update' onclick='putDatasPlayerInFormulary(this);'>Update</a></td></tr>");
}

var idPlayerWhenPressUptadeInTable;

function deleteOnePlayer(anchor) {
    var id = anchor.parentElement.parentElement.id;
  
    ajax("DELETE", "http://localhost:13503/api/players/" + id, null, function () {
        var trPlayer = window.document.getElementById(id);
        trPlayer.parentNode.removeChild(trPlayer);
    });        
}

function putDatasPlayerInFormulary(anchor) {
    var id = anchor.parentElement.parentElement.id;
    idPlayerWhenPressUptadeInTable = id;

    ajax("GET", "http://localhost:13503/api/players/" + id, null, function (player) {
        
        window.document.getElementById("nameFormulay").value = player.name;
        window.document.getElementById("surnameFormulay").value = player.surname;
        window.document.getElementById("positionFormulay").value = player.position;
        window.document.getElementById("strongLegFormulay").value = player.strongLeg;
        window.document.getElementById("ageFormulay").value = player.age;
        window.document.getElementById("numberFormulay").value = player.playerNumber;
    });
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

function changePlayerDatas() {
    var jsonPlayer = {
        "name": window.document.getElementById("nameFormulay").value,
        "surname": window.document.getElementById("surnameFormulay").value,
        "position": window.document.getElementById("positionFormulay").value,
        "strongLeg": window.document.getElementById("strongLegFormulay").value,
        "age": window.document.getElementById("ageFormulay").value,
        "playerNumber": window.document.getElementById("numberFormulay").value
    }
    
    ajax("PUT", "http://localhost:13503/api/players/" + idPlayerWhenPressUptadeInTable, jsonPlayer, function (player) {
        
        window.document.getElementById(player.playerId).childNodes[1].innerText = player.name;
        window.document.getElementById(player.playerId).childNodes[2].innerText = player.surname;
        window.document.getElementById(player.playerId).childNodes[3].innerText = player.position;
        window.document.getElementById(player.playerId).childNodes[4].innerText = player.strongLeg;
        window.document.getElementById(player.playerId).childNodes[5].innerText = player.age;
        window.document.getElementById(player.playerId).childNodes[6].innerText = player.playerNumber;
    });
    cleanFormulary();
}

