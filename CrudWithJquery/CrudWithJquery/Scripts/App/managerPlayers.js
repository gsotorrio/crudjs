$(function () {
    console.log("ready!");

    $.get("http://localhost:13503/api/players", function (data) {
        console.log(data);

        $.each(data, function (index, player) {
            $('#tbPlayers tr:last').after('<tr><td>' + player.PlayerId + '</td><td>' + player.Name + '</td><td>' + player.Surname + '</td><td>' + player.Position + '</td><td>' + player.StrongLeg + '</td><td>' + player.Age + '</td><td>' + player.PlayerNumber + '</td></tr>');
        });       
    });
});
