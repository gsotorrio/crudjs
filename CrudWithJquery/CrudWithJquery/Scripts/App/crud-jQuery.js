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
        "</td><td><a href='#' class='delete'>Delete</a></td><td><a href='#' calss='update'>Update</a></td></tr>");
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

function getDatesAboutOnePlayer() {
    $(".update").click(function (event) {
        var trPlayer = event.target.parentElement.parentElement;

        $.get("http://localhost:13503/api/players/" + trPlayer.id, function (player) {
            console.log(player);
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
        getDatesAboutOnePlayer();
    });
});

$("#create").click(function () {

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
        getDatesAboutOnePlayer();

        $("#name").val("");
        $("#surname").val("");
        $("#position").val("");
        $("#strongLeg").val("");
        $("#age").val("");
        $("#number").val("");
    });
});

// Añadir una clase ´update´ al elemento <a>Update</a>         ok

// Crear una funcion linkEventClickUpdate que contendra el evento click UPDATE. 
// Esta funcion hay que llamarla desde documento.ready y desde crear un player. Exactamente igual que linkEventClickDelete

// Cuando el usuario hace click en Update mostramos la informacion de la fila en el formulario.

// Añadir otro boton en el formulario para hacer el update.
// Cuando el usuario hace click en este boton hacemos la petición PUT al servidor

// Cuando el servidor response, borramos la fila y la creamos otra vez con los datos del player que viene desde el servidor.
// Importante, tendremos que llamar a las funciones de enlazar los eventos DELETE y UPDATE otra vez porque hemos creado una fila dinamicamente.

// Borrar la informacion del formulario
