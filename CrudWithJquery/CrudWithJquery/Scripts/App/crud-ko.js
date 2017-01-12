(function () {
    
    // Variables
    var players = ko.observableArray();

    var player = {
        playerId: ko.observable(),
        name: ko.observable(),
        surname: ko.observable(),
        position: ko.observable(),
        strongLeg: ko.observable(),
        age: ko.observable(),
        playerNumber: ko.observable()
    };

    

    //Private Functions
    function removePlayerForUpdate(playerId) {
        players.remove(function (players) {
            return players.playerId == playerId;
        });
    }

    // Public Functions
    var clean = function () {
        player.name("");
        player.surname("");
        player.position("")
        player.strongLeg("");
        player.age("");
        player.playerNumber("");
    }

    var remove = function(player, event){
        $.ajax({
            url: "http://localhost:13503/api/players/" + player.playerId,
            method: "DELETE"
        }).done(function () {
            players.remove(player);
        });
    };

    var select = function (selectedPlayer) {
        $.get("http://localhost:13503/api/players/" + selectedPlayer.playerId, function (data) {
            console.log(data);
            
            player.playerId(data.playerId);
            player.name(data.name);
            player.surname(data.surname);
            player.position(data.position);
            player.strongLeg(data.strongLeg);
            player.age(data.age);
            player.playerNumber(data.playerNumber);
        });
    }

    var updatePlayer = function () {
        var updateDataPlayer = {
            name: player.name(),
            surname: player.surname(),
            position: player.position(),
            strongLeg: player.strongLeg(),
            age: player.age(),
            playerNumber: player.playerNumber()
        }

        $.ajax({
            type: "PUT",
            url: "http://localhost:13503/api/players/" + player.playerId(),
            contentType: "application/json",
            data: JSON.stringify(updateDataPlayer)
        }).done(function (data) {
            console.log(data);

            var indexes = $.map(players(), function (obj, index) {
                if (obj.playerId == data.playerId) {
                    return index;
                }
            })

            var indexPlayer = indexes;

            players.replace(players()[indexPlayer], data);
            
            //removePlayerForUpdate(player.playerId());
           
            //players.push(data);

            clean(); 
        });
    }

    var createPlayer = function () {
        var newPlayer = {
            name: player.name(),
            surname: player.surname(),
            position: player.position(),
            strongLeg: player.strongLeg(),
            age: player.age(),
            playerNumber: player.playerNumber()
        }
        $.post("http://localhost:13503/api/players", newPlayer).done(function (data) {

            players.push(data);

            clean();
        });       
    }

    // ViewModel
    var viewModel = {
        players: players,
        remove: remove,
        select: select,
        player: player,
        updatePlayer: updatePlayer,
        clean: clean,
        createPlayer: createPlayer
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