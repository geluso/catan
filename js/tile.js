var TILE_SIZE = 50;
var SIDES = 6;

var EDGE_LENGTH = TILE_SIZE;
var HALF_EDGE = EDGE_LENGTH / 2;

var TILE_HEIGHT = Math.sqrt(3) / 2 * HALF_EDGE;

function Tile(x, y, resource, token) {
  this.resource = resource;
  this.token = token;
  this.hover = false;

  this.x = x;
  this.y = y;

  this.shape = new Hexagon(x, y, TILE_SIZE);
}

Tile.prototype.setX = function(x) {
  this.x = x;
  this.shape.x = x;
}

Tile.prototype.setY = function(y) {
  this.y = y;
  this.shape.y = y;
}

Tile.prototype.setXY = function(x, y) {
  this.setX(x);
  this.setY(y);
}

function TileGenerator() {
  var resources = new ResourceGenerator();
  var tokens = new TokenGenerator(2, 12);

  this.randomTile = function(x, y) {
    var resource = resources.randomResource(); 

    var token;
    if (resource !== DESERT) {
      token = tokens.randomToken();
    }

    var tile = new Tile(x, y, resource, token);
    return tile;
  }

  this.waterTile = function(x, y) {
    var resource = WATER;
    var tile = new Tile(x, y, resource);
    return tile;
  }
}

