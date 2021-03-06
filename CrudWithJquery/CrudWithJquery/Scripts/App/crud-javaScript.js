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
  
    var mytbody = window.document.getElementById('dynamicTr');

    var row = window.document.createElement('tr');

    var cellId = window.document.createElement('td');
        cellId.className = "hideId";
    
    var cellName = window.document.createElement('td');
    var cellSurname = window.document.createElement('td');
    var cellPosition = window.document.createElement('td');
    var cellStrongLeg = window.document.createElement('td');
    var cellAge = window.document.createElement('td');
    var cellNumber = window.document.createElement('td');
    var cellDelete = window.document.createElement('td');
    var cellUpdate = window.document.createElement('td');

    var aDelete = window.document.createElement('a');
        aDelete.href = "#";
        aDelete.onclick = function () { deleteOnePlayer(this); };

    var aUpdate = window.document.createElement('a');
        aUpdate.href = "#";
        aUpdate.onclick = function () { putDatasPlayerInFormulary(this); };
        
    var textId = window.document.createTextNode(player.playerId);
    var textName = window.document.createTextNode(player.name);
    var textSurname = window.document.createTextNode(player.surname);
    var textPosition = window.document.createTextNode(player.position);
    var textStrongLeg = window.document.createTextNode(player.strongLeg);
    var textage = window.document.createTextNode(player.age);
    var textNumber = window.document.createTextNode(player.playerNumber);
   

    cellId.appendChild(textId);
    cellName.appendChild(textName);
    cellSurname.appendChild(textSurname);
    cellPosition.appendChild(textPosition);
    cellStrongLeg.appendChild(textStrongLeg);
    cellAge.appendChild(textage);
    cellNumber.appendChild(textNumber);
    
    row.id = cellId.innerText;

    row.appendChild(cellId);
    row.appendChild(cellName);
    row.appendChild(cellSurname);
    row.appendChild(cellPosition);
    row.appendChild(cellStrongLeg);
    row.appendChild(cellAge);
    row.appendChild(cellNumber);
    row.appendChild(cellDelete);
    row.appendChild(cellUpdate);

    cellDelete.appendChild(aDelete);
    cellUpdate.appendChild(aUpdate);

    var textDelete = window.document.createTextNode("Delete");
    var textUpdate = window.document.createTextNode("Update");

    aDelete.appendChild(textDelete);
    aUpdate.appendChild(textUpdate);

    mytbody.appendChild(row);
}

var idPlayerWhenPressUptadeInTable;

function getJsonPlayer() {
    return {
        name: window.document.getElementById("nameFormulay").value,
        surname: window.document.getElementById("surnameFormulay").value,
        position: window.document.getElementById("positionFormulay").value,
        strongLeg: window.document.getElementById("strongLegFormulay").value,
        age: window.document.getElementById("ageFormulay").value,
        playerNumber: window.document.getElementById("numberFormulay").value
    }
}

function deleteOnePlayer(anchor) {
    var id = anchor.parentElement.parentElement.firstChild.innerHTML;

    ajax("DELETE", "http://localhost:13503/api/players/" + id, null, function () {
        var trPlayer = anchor.parentElement.parentElement;
        trPlayer.parentNode.removeChild(trPlayer);
    });        
}

function putDatasPlayerInFormulary(anchor) {
    var id = anchor.parentElement.parentElement.firstChild.innerHTML;
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

    for (var i = 0; i < players.length; i++) {
        createTrPlayer(players[i]);
    }
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

    ajax("POST", "http://localhost:13503/api/players", getJsonPlayer(), function (player) {

        createTrPlayer(player);
        
        cleanFormulary();
    });
}

function changePlayerDatas() {
    
    ajax("PUT", "http://localhost:13503/api/players/" + idPlayerWhenPressUptadeInTable, getJsonPlayer(), function (player) {
        
        window.document.getElementById(player.playerId).childNodes[1].innerText = player.name;
        window.document.getElementById(player.playerId).childNodes[2].innerText = player.surname;
        window.document.getElementById(player.playerId).childNodes[3].innerText = player.position;
        window.document.getElementById(player.playerId).childNodes[4].innerText = player.strongLeg;
        window.document.getElementById(player.playerId).childNodes[5].innerText = player.age;
        window.document.getElementById(player.playerId).childNodes[6].innerText = player.playerNumber;
    });
    cleanFormulary();
}