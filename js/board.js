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

    for (var row = 0; row < board.rows; row++) {
      for (var col = 0; col < board.columns; col++) {
        var xOff = TILE_SIZE * 1.5;
        var yOff = TILE_SIZE * 1.72;

        var x = xOff / 2 + xOff * col;
        var y = yOff / 2 + yOff * row;

        if (col % 2 === 1) {
          y += TILE_SIZE * .86;
        }

        x = Math.floor(x);
        y = Math.floor(y);

        ctx.translate(x, y);

        var tile = board.tileLookup[row][col];
        tileDrawer.draw(tile);

        ctx.translate(-x, -y);
      }
    }

    this.ctx.restore();
  };
}
