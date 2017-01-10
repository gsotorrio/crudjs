(function () {
    
    // Variables
    var players = ko.observableArray();
    var playerUpdate = {
        name: ko.observable(),
        surname: ko.observable(),
        position: ko.observable(),
        strongLeg: ko.observable(),
        age: ko.observable(),
        playerNumber: ko.observable()
    };
    var idPlayerUpdate;

    // Functions
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

           
        });
    }

    // ViewModel
    var viewModel = {
        players: players,
        remove: remove,
        update: update,
        playerUpdate: playerUpdate,
        updatePlayerInTable: updatePlayerInTable
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
