var WIDTH = .2 * TILE_SIZE;
var HEIGHT = .2 * TILE_SIZE;

function Settlement(corner, player) {
  this.corner = corner;
  this.player = player;
}

function SettlementDrawer(ctx) {
  this.ctx = ctx;

  this.drawSettlements = function(settlements) {
    this.ctx.save();

    for (var i = 0; i < settlements.length; i++) {
      var settlement = settlements[i];
      this.draw(settlement);
    }

    this.ctx.restore();
  };

  this.draw = function(settlement) {

    var x = settlement.corner.x;
    var y = settlement.corner.y;

    this.ctx.fillStyle = settlement.player;
    this.ctx.fillRect(x, y, WIDTH, HEIGHT);
    this.ctx.strokeRect(x, y, WIDTH, HEIGHT);
  };
}
