(function () {
    
    // Variables
    var players = ko.observableArray();
    var playerUpdate = {
        //playerId: ko.observable(),
        name: ko.observable(),
        surname: ko.observable(),
        position: ko.observable(),
        strongLeg: ko.observable(),
        age: ko.observable(),
        playerNumber: ko.observable()
    };
    var idPlayerUpdate;

    // Functions
    var clean = function () {
        playerUpdate.name("");
        playerUpdate.surname("");
        playerUpdate.position("")
        playerUpdate.strongLeg("");
        playerUpdate.age("");
        playerUpdate.playerNumber("");
    }

    var remove = function(player, event){
        $.ajax({
            url: "http://localhost:13503/api/players/" + player.playerId,
            method: "DELETE"
        }).done(function () {
            players.remove(player);
        });
    };

    var update = function (player) {
        $.get("http://localhost:13503/api/players/" + player.playerId, function (data) {
            console.log(data);
            
            //playerUpdate.playerId(data.playerId),
            playerUpdate.name(data.name);
            playerUpdate.surname(data.surname);
            playerUpdate.position(data.position);
            playerUpdate.strongLeg(data.strongLeg);
            playerUpdate.age(data.age);
            playerUpdate.playerNumber(data.playerNumber);

            idPlayerUpdate = data.playerId;
        });
    }

    var updatePlayerInTable = function () {
        var updateDataPlayer = {
            name: playerUpdate.name(),
            surname: playerUpdate.surname(),
            position: playerUpdate.position(),
            strongLeg: playerUpdate.strongLeg(),
            age: playerUpdate.age(),
            playerNumber: playerUpdate.playerNumber()
        }

        $.ajax({
            type: "PUT",
            url: "http://localhost:13503/api/players/" + idPlayerUpdate,
            contentType: "application/json",
            data: JSON.stringify(updateDataPlayer)
        }).done(function (data) {
            console.log(data);

            clean();
            
        });
    }

    var putNewPlayerIntable = function () {
        var newPlayer = {
            playerId: playerUpdate.playerId,
            name: playerUpdate.name(),
            surname: playerUpdate.surname(),
            position: playerUpdate.position(),
            strongLeg: playerUpdate.strongLeg(),
            age: playerUpdate.age(),
            playerNumber: playerUpdate.playerNumber()
        }

        $.post("http://localhost:13503/api/players", newPlayer).done(function (player) {

            players.push(newPlayer);

            clean();
        });       
    }

    // ViewModel
    var viewModel = {
        players: players,
        remove: remove,
        update: update,
        playerUpdate: playerUpdate,
        updatePlayerInTable: updatePlayerInTable,
        clean: clean,
        putNewPlayerIntable: putNewPlayerIntable
    };

    // On initialize
    $(function () {
        console.log("ready!");

        $.get("http://localhost:13503/api/players", function (data) {
            console.log(data);

            players(data);
            ko.applyBindings(viewModel);
        });
    });
})();
