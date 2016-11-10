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
        "</td><td><a href='#' class='delete'>Delete</a></td><td><a href='#'>Update</a></td></tr>");
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

$(function () {
    console.log("ready!");

    $.get("http://localhost:13503/api/players", function (players) {
        console.log(players);

        $.each(players, function (index, player) {
            putNewPlayerInTable(player);
        });

        linkEventClickDelete();
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
        linkEventClickDelete();

        $("#name").val("");
        $("#surname").val("");
        $("#position").val("");
        $("#strongLeg").val("");
        $("#age").val("");
        $("#number").val("");
    });
});


// AL elemento td update anaidirle evento click de jquery
// cuando el usuario hace cilck mostramos la informacion de la fila en el formulario
// aniadir otroboton para hacer el put 
// cuando tenga la respuesta del servidor borro la fila y la vuelvo a crear con el player que viene del servidor