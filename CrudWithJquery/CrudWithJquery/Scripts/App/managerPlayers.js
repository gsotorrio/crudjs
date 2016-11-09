﻿function putNewPlayerInTable(player) {
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
        "</td><td><a id='" + player.playerId + "' href='#' class='delete'>Delete</a></td><td><a href='#'>Update</a></td></tr>");
}

$(function () {
    console.log("ready!");

    $.get("http://localhost:13503/api/players", function (players) {
        console.log(players);

        $.each(players, function (index, player) {
            putNewPlayerInTable(player);
        });

        $(".delete").click(function (event) {
            $.ajax({
                url: "http://localhost:13503/api/players/" + event.target.id,  
                method: "DELETE"
            }).done(function () {
                $("#" + event.target.id).remove();  
            });
        });
    });
});

$("#save").click(function () {

    var name = $("#name").val();
    var surname = $("#surname").val();
    var position = $("#position").val();
    var strongLeg = $("#strongLeg").val();
    var age = $("#age").val();
    var number = $("#number").val();

    $.post("http://localhost:13503/api/players", {
        name: name,
        surname: surname,
        position: position,
        strongLeg: strongLeg,
        age: age,
        playerNumber: number
    }).done(function (player) {
        putNewPlayerInTable(player);

        $("#name").val("");
        $("#surname").val("");
        $("#position").val("");
        $("#strongLeg").val("");
        $("#age").val("");
        $("#number").val("");
    });
});


