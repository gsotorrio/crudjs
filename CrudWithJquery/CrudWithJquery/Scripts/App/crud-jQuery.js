var idPlayerAfterPressUpdateTable;

function putNewPlayerInTable(player) {
    $("#tbPlayers tr:last").after(
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
        "</td><td><a href='#' class='delete'>Delete</a></td><td><a href='#' class='update'>Update</a></td></tr>");
}

function linkEventClickDelete() {
    $(".delete").click(function (event) {

        var trPlayer = event.target.parentElement.parentElement;
        
        $.ajax({
            url: "http://localhost:13503/api/players/" + trPlayer.id,
            method: "DELETE"
        }).done(function () {
            $("#" + trPlayer.id).remove();
        });
    });
}

function linkEventClickUpdate() {
    $(".update").click(function (event) {

        var trPlayer = event.target.parentElement.parentElement;
        idPlayerAfterPressUpdateTable = trPlayer.id;
        
        $.get("http://localhost:13503/api/players/" + trPlayer.id, function (player) {
            console.log(player);

            $("#name").val(player.name);
            $('#surname').val(player.surname);
            $('#position').val(player.position);
            $('#strongLeg').val(player.strongLeg);
            $('#age').val(player.age);
            $('#number').val(player.playerNumber)       
        });    
    });
}

function textBoxDelete() {
    $("#name").val("");
    $("#surname").val("");
    $("#position").val("");
    $("#strongLeg").val("");
    $("#age").val("");
    $("#number").val("");
}

$(function () {
    console.log("ready!");

    $.get("http://localhost:13503/api/players", function (players) {
        console.log(players);

        $.each(players, function (index, player) {
            putNewPlayerInTable(player);
        });

        linkEventClickDelete();
        linkEventClickUpdate();
    });
});

$("#create").click(function () {

    $.post("http://localhost:13503/api/players", {
        name: $("#name").val(),
        surname: $("#surname").val(),
        position: $("#position").val(),
        strongLeg: $("#strongLeg").val(),
        age: $("#age").val(),
        playerNumber: $("#number").val()
    }).done(function (player) {

        putNewPlayerInTable(player);

        linkEventClickDelete();
        linkEventClickUpdate();

        textBoxDelete();
    });
});

$("#update").click(function () {
    var jsonPlayer = {
        name: $("#name").val(),
        surname: $("#surname").val(),
        position: $("#position").val(),
        strongLeg: $("#strongLeg").val(),
        age: $("#age").val(),
        playerNumber: $("#number").val()
    };

    $.ajax({
        type: "PUT",
        url: "http://localhost:13503/api/players/" + idPlayerAfterPressUpdateTable,
        contentType: "application/json",
        data: JSON.stringify(jsonPlayer)
    }).done(function (player) {

        $("#" + player.playerId).find("td").eq(1).html(player.name);
        $("#" + player.playerId).find("td").eq(2).html(player.surname);
        $("#" + player.playerId).find("td").eq(3).html(player.position);
        $("#" + player.playerId).find("td").eq(4).html(player.strongLeg);
        $("#" + player.playerId).find("td").eq(5).html(player.age);
        $("#" + player.playerId).find("td").eq(6).html(player.playerNumber);

        textBoxDelete();
    });
});

$("#clean").click(function () {
    textBoxDelete();
});
