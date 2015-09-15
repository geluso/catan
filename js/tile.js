var TILE_SIZE = 50;
var SIDES = 6;

var EDGE_LENGTH = TILE_SIZE;
var HALF_EDGE = EDGE_LENGTH / 2;

var TILE_HEIGHT = Math.sqrt(3) / 2 * HALF_EDGE;

var PLAYERS = ["red", "orange", "green", "blue", "white", "orange"];

function Tile(resource, token) {
  this.resource = resource;
  this.token = token;
  this.hover = false;

  this.x = undefined;
  this.y = undefined;

  this.roads = [];
  this.settlements = [];
  this.cities = [];

  for (var i = 0; i < SIDES; i++) {
    break;
    this.roads[i] = {player: _.sample(PLAYERS)};
    if (Math.random() < .5) {
      this.settlements[i] = {player: _.sample(PLAYERS)};
    } else {
      this.cities[i] = {player: _.sample(PLAYERS)};
    }
  }

  this.getRelativeCorners = function() {
    if (this.x === undefined && this.y === undefined) {
      return [];
    }

    var corners = [];

    yOff = Math.sin(2 * Math.PI / SIDES) * EDGE_LENGTH;
    
    // c1
    var x = HALF_EDGE;
    var y = -yOff;
    corners.push(new Corner(x, y));

    // c2
    x = EDGE_LENGTH;
    y = 0;
    corners.push(new Corner(x, y));

    // c3
    x = HALF_EDGE;
    y = yOff;
    corners.push(new Corner(x, y));

    // c4
    x = -HALF_EDGE;
    y = yOff;
    corners.push(new Corner(x, y));

    // c5
    x = -EDGE_LENGTH;
    y = 0;
    corners.push(new Corner(x, y));

    // c6
    x = -HALF_EDGE;
    y = -yOff;
    corners.push(new Corner(x, y));

    return corners;

  }

  this.getCorners = function() {
    var corners = this.getRelativeCorners();

    for (var i = 0; i < corners.length; i++) {
      corners[i].x += this.x;
      corners[i].y += this.y;
    }

    return corners;
  }
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
    tile.hover = true

    this.ctx.save();

    if (tile.hover) {
      this.ctx.lineWidth = "4";
      this.ctx.strokeStyle = "blue";
    } else {
      this.ctx.strokeStyle = "black";
    }

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

    // draw roads
    for (var i = 0; i < SIDES; i++) {
      this.ctx.rotate(2 * Math.PI / SIDES);

      if (tile.roads[i]) {
        var width = .6 * TILE_SIZE;
        var height = .1 * TILE_SIZE;

        var x = -width / 2;
        var y = -TILE_SIZE + height;

        this.ctx.fillStyle = tile.roads[i].player;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.strokeRect(x, y, width, height);
      }
    }

    this.ctx.save();
    // draw settlement
    var rotation = 2 * Math.PI / SIDES;
    this.ctx.rotate(rotation / 2);
    for (var i = 0; i < SIDES; i++) {
      this.ctx.rotate(rotation);

      if (tile.settlements[i]) {
        var width = .2 * TILE_SIZE;
        var height = .2 * TILE_SIZE;

        var x = -width / 2;
        var y = -TILE_SIZE - height / 2;

        this.ctx.fillStyle = tile.settlements[i].player;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.strokeRect(x, y, width, height);
      }
    }
    this.ctx.restore();

    // draw settlement
    var rotation = 2 * Math.PI / SIDES;
    this.ctx.rotate(rotation / 2);
    for (var i = 0; i < SIDES; i++) {
      this.ctx.rotate(rotation);

      if (tile.cities[i]) {
        var width = 2 * .2 * TILE_SIZE;
        var height = .2 * TILE_SIZE;

        var x = -width / 2;
        var y = -tile_size - height / 2;

        this.ctx.fillStyle = tile.cities[i].player;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.strokeRect(x, y, width, height);
      }
    }

    if (tile.resource !== DESERT) {
      this.tokenDrawer.draw(tile.token);
    }

    this.ctx.restore();

    if (tile.hover) {
      var corners = tile.getCorners();
      for (var i = 0; i < corners.length; i++) {
        var x = corners[i].x;
        var y = corners[i].y;

        var radius = 4;
        var startAngle = 0; // Starting point on circle
        var endAngle = 2 * Math.PI; // End point on circle

        var path = new Path2D();
        path.arc(x, y, radius, startAngle, endAngle);

        ctx.fillStyle = "Khaki";
        ctx.fill(path);
      };

      debugger
    }

  }
}
