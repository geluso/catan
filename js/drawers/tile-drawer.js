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

    this.ctx.save();
    this.ctx.lineWidth = 5;

    if (tile.isCoast) {
      _.each(tile.shape.getEdges(), function(edge) {
        if (edge.isPort) {
          this.ctx.strokeStyle = "yellow";
        } else {
          this.ctx.strokeStyle = "black";
        }

        if (edge.isCoast) {
          this.ctx.beginPath();
          this.ctx.moveTo(edge.c1.x, edge.c1.y);
          this.ctx.lineTo(edge.c2.x, edge.c2.y);
          this.ctx.stroke();
        }
      }, this);
    }

    this.ctx.restore();
  }
}
