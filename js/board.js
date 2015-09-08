function Board() {
  this.tiles = [];

  this.addTile = function(tile) {
    this.tiles.push(tile);
  };
}

function BoardDrawer(ctx) {
  this.ctx = ctx;

  var tileDrawer = new TileDrawer(ctx);

  this.draw = function(board) {
    this.ctx.save();

    var offset = 0;
    for (var i = 0; i < board.tiles.length; i++) {
      offset = 100 + 200 * i;
      ctx.translate(offset, offset);

      var tile = board.tiles[i];
      tileDrawer.draw(tile);

    }

    this.ctx.restore();
  };
}
