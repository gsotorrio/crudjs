function SaveDatas() {
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