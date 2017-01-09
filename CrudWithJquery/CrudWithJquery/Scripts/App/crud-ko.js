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
        });
    }

    // ViewModel
    var viewModel = {
        players: players,
        remove: remove,
        update: update,
        playerUpdate: playerUpdate
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
