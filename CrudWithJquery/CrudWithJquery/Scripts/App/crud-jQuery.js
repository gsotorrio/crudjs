var idPlayer;

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
        idPlayer = trPlayer;
        
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

        $("#name").val("");
        $("#surname").val("");
        $("#position").val("");
        $("#strongLeg").val("");
        $("#age").val("");
        $("#number").val("");
    });
});

$("#update").click(function () {
    var trPlayer = idPlayer;
    
    $.ajax({
        type: "PUT",
        url: "http://localhost:13503/api/players/" + trPlayer,
        contentType: "application/json",
        data: {
            name: $("#name").val(),
            surname: $("#surname").val(),
            position: $("#position").val(),
            strongLeg: $("#strongLeg").val(),
            age: $("#age").val(),
            playerNumber: $("#number").val()
        }
    });
});

// Añadir una clase ´update´ al elemento <a>Update</a>         ok

// Crear una funcion linkEventClickUpdate que contendra el evento click UPDATE.                 ok 
// Esta funcion hay que llamarla desde documento.ready y desde crear un player. Exactamente igual que linkEventClickDelete            ok

// Cuando el usuario hace click en Update mostramos la informacion de la fila en el formulario.                     ok

// Añadir otro boton en el formulario para hacer el update.                         ok
// Cuando el usuario hace click en este boton hacemos la petición PUT al servidor

// Cuando el servidor response, borramos la fila y la creamos otra vez con los datos del player que viene desde el servidor.
// Importante, tendremos que llamar a las funciones de enlazar los eventos DELETE y UPDATE otra vez porque hemos creado una fila dinamicamente.

// Borrar la informacion del formulario
