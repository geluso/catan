function TileDrawer(ctx) {
  this.ctx = ctx;
  this.tokenDrawer = new TokenDrawer(ctx);

  this.drawTiles = function(tiles) {
    this.ctx.save();

    for (var i = 0; i < tiles.length; i++) {
      var tile = tiles[i];
      this.draw(tile);
    }

    this.ctx.restore();

  };

  this.draw = function(tile) {
    var stroke = "black";

    tile.shape.fillStroke(this.ctx, tile.resource.color, stroke);

    if (tile.token) {
      this.tokenDrawer.draw(tile.token, tile.x, tile.y);
    }
  }
}
