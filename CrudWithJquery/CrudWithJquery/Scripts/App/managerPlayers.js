$(function () {
    console.log("ready!");

    $.get("http://localhost:13503/api/players", function (data) {
        console.log(data);

        $.each(data, function (index, player) {
            $('#tbPlayers tr:last').after('<tr><td>' + player.playerId + '</td><td>' + player.name + '</td><td>' + player.surname + '</td><td>' + player.position + '</td><td>' + player.strongLeg + '</td><td>' + player.age + '</td><td>' + player.playerNumber + '</td></tr>');
        });       
    });
});
