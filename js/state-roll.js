function StateRoll(board) {
  this.board = board;
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

  $(".messages").text("Rolled: " + roll);


  if (roll === 7) {
    $(".messages").text("Rolled: 7. All resources halved.");
    halveResources();
    return;
  }

  var tiles = [];
  _.each(this.board.tiles, function(tile) {
    if (tile.token) {
      if (tile.token.value === roll) {
        tiles.push(tile);
      }
    }
  });

  if (tiles.length === 0) {
    $(".messages").text($(".messages").text() + " . Nothing.");
    return;
  }

  _.each(tiles, function(tile) {
    var corners = tile.shape.getCorners();
    _.each(corners, function(corner) {
      var key = corner.key()

      if (this.board.settlements[key]) {
        RESOURCES[tile.resource.name] += 1;
      } else if (this.board.cities[key]) {
        RESOURCES[tile.resource.name] += 2;
      }
    }, this);
  }, this);

  updateResources();
}
