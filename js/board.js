function Board(rows, cols) {

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
      var xOff = TILE_SIZE * 1.5;
      var yOff = TILE_SIZE * 1.72;

      var x = xOff * col;
      var y = yOff * row;

      if (col % 2 === 1) {
        y += TILE_SIZE * .86;
      }

      x = Math.floor(x);
      y = Math.floor(y);

      var tile = tileGen.randomTile();
      tile.x = x;
      tile.y = y;

      this.tiles.push(tile);
      this.tileLookup[row][col] = tile;
    }
  }

  this.getTile = function(x, y) {
    var tile;

    for (var i = 0; i < this.tiles.length; i++) {
      var xx = Math.abs(this.tiles[i].x - x);
      var yy = Math.abs(this.tiles[i].y - y);
      if (xx < TILE_SIZE && yy < TILE_SIZE) {
        tile = this.tiles[i];
      }
    }

    return tile;
  }
}

function BoardDrawer(ctx) {
  this.ctx = ctx;

  var tileDrawer = new TileDrawer(ctx);

  this.draw = function(board) {
    this.ctx.save();

    for (var row = 0; row < board.rows; row++) {
      for (var col = 0; col < board.columns; col++) {
        var tile = board.tileLookup[row][col];
        tileDrawer.draw(tile);
      }
    }

    this.ctx.restore();
  };
}
