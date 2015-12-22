function FourPlayerBoard() {
  this.type = "Four";
}

FourPlayerBoard.prototype = new Board();

FourPlayerBoard.prototype.init = function(tilespace) {
  // Let the original Board set up itself.
  Board.prototype.init.call(this, tilespace);

  // then set up ourselves.
  _.each(FourPlayerBoard.TILE_ORDERED_ARRANGEMENT, function(position) {
    var tile = this.getTile(position.x, position.y);
    tile.resource = DESERT;
  }, this);

  var center = this.getTile(FourPlayerBoard.CENTER_TILE.x, FourPlayerBoard.CENTER_TILE.y);
  center.resource = BRICK;

  return this;
}

FourPlayerBoard.TILE_ORDERED_ARRANGEMENT = [{"x":525,"y":301},{"x":600,"y":258},{"x":675,"y":215},{"x":750,"y":258},{"x":825,"y":301},{"x":825,"y":387},{"x":825,"y":473},{"x":750,"y":516},{"x":675,"y":559},{"x":600,"y":516},{"x":525,"y":473},{"x":525,"y":387},{"x":600,"y":344},{"x":675,"y":301},{"x":750,"y":344},{"x":750,"y":430},{"x":675,"y":473},{"x":600,"y":430},{"x":675,"y":387}];
FourPlayerBoard.CENTER_TILE = {x: 675, y: 387};

