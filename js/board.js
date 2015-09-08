function Board(cols, rows) {

  this.tiles = [];
  this.tileLookup = {};

  this.columns = cols;
  this.rows = rows;

  for (var row = 0; row < rows; row++) {
    this.tileLookup[row] = {};
  }

  var tileGen = new TileGenerator();
  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < cols; col++) {
      var tile = tileGen.randomTile();

      this.tiles.push(tile);
      this.tileLookup[row][col] = tile;
    }
  }
}

function BoardDrawer(ctx) {
  this.ctx = ctx;

  var tileDrawer = new TileDrawer(ctx);

  this.draw = function(board) {
    this.ctx.save();

    var offset = 210;
    for (var row = 0; row < board.rows; row++) {
      for (var col = 0; col < board.columns; col++) {
        var x = offset / 2 + offset * col;
        var y = offset / 2 + offset * row;

        x = Math.round(x);
        y = Math.round(y);

        ctx.translate(x, y);

        var tile = board.tileLookup[row][col];
        tileDrawer.draw(tile);

        ctx.translate(-x, -y);
      }
    }

    this.ctx.restore();
  };
}
