<<<<<<< HEAD
﻿function SaveDatas() {
    this.playerId = ko.observable();
    this.name = ko.observable();
    this.surname = ko.observable();
    this.position = ko.observable();
    this.strongLeg = ko.observable();
    this.age = ko.observable();
    this.numberPlayer = ko.observable();
}

function AddPlayersInTable() {
    var self = this;

   this.arrayPlayers = ko.observableArray([    ]);

    self.addNewRow = function () {
        self.arrayPlayers.push(new SaveDatas());
    }

}

ko.applyBindings(new AddPlayersInTable());
=======
﻿(function () {

    // Variables
    var players = ko.observableArray();

    // Functions
    var remove = function(player, event){
        $.ajax({
            url: "http://localhost:13503/api/players/" + player.playerId,
            method: "DELETE"
        }).done(function () {
            players.remove(player);
        });
    };

    // ViewModel
    var viewModel = {
        players: players,
        remove: remove
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
>>>>>>> 6fd8d59649e2c05ff86ab9227bbf974354f17902
