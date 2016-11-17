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




ajax("GET", "http://localhost:13503/api/players", null, function (data) {
    console.log(data);

    var table = document.createElement('table');
    for (var i = 0; i < data.length; i++) {
        var tr = document.createElement('tr');

        var tdName = document.createElement('td');
        var tdSurName = document.createElement('td');
        var tdPosition = document.createElement('td');
        var tdStrongLeg = document.createElement('td');
        var tdAge = document.createElement('td');
        var tdNumber = document.createElement('td');
        var tdDelete = document.createElement('td');
        var tdUpdate = document.createElement('td');

        var name = document.createTextNode(player.name);
        var surname = document.createTextNode(data.surname);
        var position = document.createTextNode(data.position);
        var strongLeg = document.createTextNode(data.strongLeg);
        var age = document.createTextNode(data.age);
        var number = document.createTextNode(data.playerNumber);
        var clean = document.createTextNode("delete");
        var update = document.createTextNode("update");

        tdName.appendChild(name);
        tdSurName.appendChild(surname);
        tdPosition.appendChild(position);
        tdStrongLeg.appendChild(strongLeg);
        tdAge.appendChild(age);
        tdNumber.appendChild(number);
        tdDelete.appendChild(clean);
        tdUpdate.appendChild(update);

        tr.appendChild(tdName);
        tr.appendChild(tdSurName);
        tr.appendChild(tdPosition);
        tr.appendChild(tdStrongLeg);
        tr.appendChild(tdAge);
        tr.appendChild(tdNumber);
        tr.appendChild(tdDelete);
        tr.appendChild(tdUpdate);

        table.appendChild(tr);
    }
    document.body.appendChild(table);
});



