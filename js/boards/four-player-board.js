function FourPlayerBoard() {
  this.type = "Four";
}

FourPlayerBoard.prototype = new Board();

FourPlayerBoard.prototype.init = function(tilespace) {
  // Let the original Board set up itself.
  Board.prototype.init.call(this, tilespace);

  var center = this.getTile(FourPlayerBoard.CENTER_TILE.x, FourPlayerBoard.CENTER_TILE.y);

  // define what resources are available
  var resources = [
    DESERT,
    BRICK, BRICK, BRICK,
    ORE, ORE, ORE,
    WOOD, WOOD, WOOD, WOOD,
    SHEEP, SHEEP, SHEEP, SHEEP,
    WHEAT, WHEAT, WHEAT, WHEAT
  ];

  // shuffle the resources
  resources = _.shuffle(resources);

  // make a mutable copy of the token arrangement
  var tokens = FourPlayerBoard.TOKEN_ARRANGEMENT.slice();

  // go through all our tiles and place the tokens and assign shuffled resources
  _.each(FourPlayerBoard.TILE_ARRANGEMENT, function(position) {
    var tile = this.getTile(position.x, position.y);
    tile.resource = resources.pop(0);
    if (tile.resource !== DESERT) {
      var value = tokens.shift();
      tile.token = new Token(value);
    }
  }, this);

  return this;
}

FourPlayerBoard.TOKEN_ARRANGEMENT = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11];
FourPlayerBoard.TILE_ARRANGEMENT = [{"x":525,"y":301},{"x":600,"y":258},{"x":675,"y":215},{"x":750,"y":258},{"x":825,"y":301},{"x":825,"y":387},{"x":825,"y":473},{"x":750,"y":516},{"x":675,"y":559},{"x":600,"y":516},{"x":525,"y":473},{"x":525,"y":387},{"x":600,"y":344},{"x":675,"y":301},{"x":750,"y":344},{"x":750,"y":430},{"x":675,"y":473},{"x":600,"y":430},{"x":675,"y":387}];
FourPlayerBoard.CENTER_TILE = {x: 675, y: 387};

