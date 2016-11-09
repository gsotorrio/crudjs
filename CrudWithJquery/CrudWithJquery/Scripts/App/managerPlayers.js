function putNewPlayerInTable(player) {
    $("#tbPlayers tr:last").after("<tr><td class='hideId'>" + player.playerId + "</td><td>" + player.name + "</td><td>" + player.surname + "</td><td>" + player.position + "</td><td>" + player.strongLeg + "</td><td>" + player.age + "</td><td>" + player.playerNumber + "</td></tr>");
}

$(function () {
    console.log("ready!");

    $.get("http://localhost:13503/api/players", function (players) {
        console.log(players);

        $.each(players, function (index, player) {
            putNewPlayerInTable(player);
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


