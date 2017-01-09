(function () {

    // Variables
    var players = ko.observableArray();
    var playerUpdate = ko.observable;

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

            playerUpdate(data);
        });
    }

    // ViewModel
    var viewModel = {
        players: players,
        remove: remove,
        update: update
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
