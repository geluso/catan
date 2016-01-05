function StateRoll(game) {
  this.game = game;
  this.board = game.board;
}

StateRoll.prototype.execute = function() {
  if (_.size(this.board.settlements, this) + _.size(this.board.cities, this) === 0) {
    $(".messages").text("choose settlements before rolls will make any effect");
    return;
  }

  var die = [1,2,3,4,5,6];
  var d1 = _.sample(die);
  var d2 = _.sample(die);
  var roll = d1 + d2;

  if (LOG_TURNS) {
    var msg = "rolled " + roll;
    GameLog(msg, this.game.turn.currentTurn);

    console.log(this.game.turn.currentTurn, "rolls", roll);
  }

  $(".messages").text("Rolled: " + roll);

  if (roll === 7) {
    $(".messages").text("Rolled: 7. Robber!");
    halveResources(this.game.players);

    var resourceTiles = _.filter(this.board.tiles, function(tile) {
      return tile.resource !== WATER && tile.resource !== DESERT;

    });
    this.board.robber.tile = _.sample(resourceTiles);

    if (LOG_ROBBER) {
      console.log("robber moved to", this.board.robber.tile);
    }

    return;
  }

  var tiles = [];
  _.each(this.board.tiles, function(tile) {
    if (tile.token) {
      if (tile.token.value === roll) {
        if (this.board.robber.tile !== tile) {
          tiles.push(tile);
        }
      }
    }
  }, this);

  if (tiles.length === 0) {
    $(".messages").text($(".messages").text() + " . Nothing.");
    return;
  }

  _.each(tiles, function(tile) {
    var corners = tile.shape.getCorners();
    _.each(corners, function(corner) {
      var key = corner.key()

      if (this.board.settlements[key]) {
        var player = this.board.settlements[key].player;
        RESOURCES[player][tile.resource.name] += 1;
      } else if (this.board.cities[key]) {
        var player = this.board.cities[key].player;
        RESOURCES[player][tile.resource.name] += 2;
      }
    }, this);
  }, this);

  updateResources();

  $("button.roll").hide();
  $("button.endturn").show()
}
