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


// How to use the custom ajax function
var json = {
    "playerId": "18743c1a-a71d-4fad-90a5-5c440738cc13",
    "name": "sample string 2",
    "surname": "sample string 3",
    "position": "sample string 4",
    "strongLeg": "sample string 5",
    "age": 6,
    "playerNumber": 7
};

ajax("POST", "http://localhost:13503/api/players", json, function (data) {
    console.log(data);
});

ajax("GET", "http://localhost:13503/api/players", null, function(data) {
    console.log(data);
});