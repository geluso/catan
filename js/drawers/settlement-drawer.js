function SettlementDrawer(ctx) {
  this.ctx = ctx;

  this.drawSettlements = function(settlements) {
    this.ctx.save();

    for (var corner in settlements) {
      var settlement = settlements[corner];
      this.draw(settlement);
    }

    this.ctx.restore();
  };

  this.draw = function(settlement) {
    var x = settlement.corner.x - Settlement.WIDTH / 2;
    var y = settlement.corner.y - Settlement.WIDTH / 2;

    this.ctx.fillStyle = settlement.player;
    this.ctx.fillRect(x, y, Settlement.WIDTH, Settlement.HEIGHT);
    this.ctx.strokeRect(x, y, Settlement.WIDTH, Settlement.HEIGHT);
  };

  this.ghost = function(corner) {
    this.ctx.globalAlpha = .5;
    this.draw({corner: corner, player: "red"});
    this.ctx.globalAlpha = 1;
  }
}

Settlement.WIDTH = .2 * TILE_SIZE;
Settlement.HEIGHT = .2 * TILE_SIZE;
