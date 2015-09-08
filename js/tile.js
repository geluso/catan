var TILE_SIZE = 50;
var SIDES = 6;

function Tile(resource, token) {
  this.resource = resource;
  this.token = token;
}

function TileGenerator() {
  var resources = new ResourceGenerator();
  var tokens = new TokenGenerator(2, 12);

  this.randomTile = function() {
    var resource = resources.randomResource(); 
    var token = tokens.randomToken();

    var tile = new Tile(resource, token);
    return tile;
  }
}

function TileDrawer(ctx) {
  this.ctx = ctx;
  this.tokenDrawer = new TokenDrawer(ctx);

  this.draw = function(tile) {
    this.ctx.save();
    this.ctx.stokeStyle = "black";

    this.ctx.beginPath();
    this.ctx.translate(tile.x, tile.y);
    this.ctx.moveTo(TILE_SIZE, 0);

    for (var i = 0; i < SIDES; i++) {
      this.ctx.rotate(2 * Math.PI / SIDES);
      this.ctx.lineTo(TILE_SIZE, 0);
    }

    this.ctx.fillStyle = tile.resource.color;
    this.ctx.fill();
    this.ctx.stroke();

    this.tokenDrawer.draw(tile.token);

    this.ctx.restore();
  }
}
