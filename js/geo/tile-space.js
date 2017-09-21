function TileSpace() {
  this.tiles = [];
  this.edges = [];
  this.corners = [];

  this.edgeGraph = {};
  this.cornerGraph = {};
  this.cornerToEdges = {};

  // a list of all tiles, corners, and edges
  this.everything = [];
};

TileSpace.prototype.init = function(width, height) {
  this.width = width;
  this.height = height;

  this.rows = Math.ceil(height / (TILE_SIZE * 1.72));
  this.cols = Math.ceil(width / (TILE_SIZE * Math.sqrt(2)));

  this.createHexagons();
  this.centerTiles();

  return this;
};

TileSpace.prototype.curateBoard = function() {
  this.gatherAndDedupeCornersAndEdges();
  this.collectNieghboringEdges();
  this.collectNieghboringCorners();

  // find coast
  this.markCoastalEdges();

  // make a list containing every tile, corner and edge on the board.
  this.everything = _.union(this.tiles, this.corners, this.edges);
};

TileSpace.prototype.createHexagons = function() {
  var tileGen = new TileGenerator();
  for (var row = 0; row < this.rows; row++) {
    for (var col = 0; col < this.cols; col++) {
      var xOff = TILE_SIZE * 1.5;
      var yOff = TILE_SIZE * 1.72;

      var x = xOff * col;
      var y = yOff * row;

      if (col % 2 === 1) {
        y += TILE_SIZE * .86;
      }

      x = Math.floor(x);
      y = Math.floor(y);

      var tile = tileGen.waterTile(x, y);
      this.tiles.push(tile);
    }
  }
};

var CENTER;

// find the centermost tile and schooch all tiles so they're
// centered in the screen.
TileSpace.prototype.centerTiles = function() {
  // target the center of the screen.
  var target = {x: this.width / 2, y: this.height / 2};

  var bestDiff = undefined;
  var bestTile = undefined;

  // compare each tile to the ideal target point to find the closest center tile.
  _.each(this.tiles, function(tile) {
    var diff = Math.abs(tile.x - target.x) + Math.abs(tile.y - target.y);
    if (bestTile === undefined || diff < bestDiff) {
      bestDiff = diff;
      bestTile = tile;
    }
  });

  // declare the best fit tile as the center tile.
  this.centerTile = bestTile;
  CENTER = this.centerTile;

  // measure the distance between the center of the screen and the center tile.
  var xOffset = target.x - (this.centerTile.x);
  var yOffset = target.y - (this.centerTile.y);

  // move all tiles according to the center measured distance
  _.each(this.tiles, function(tile) {
    tile.setX(tile.x + xOffset);
    tile.setY(tile.y + yOffset);
  });
};

TileSpace.prototype.centerOnHexCenter = function() {
  // this is default layout
};

TileSpace.prototype.centerOnHexEdges = function() {
  var xOffset = TILE_HEIGHT + EDGE_LENGTH;

  // move all tiles according to the center measured distance
  _.each(this.tiles, function(tile) {
    tile.setX(tile.x - xOffset);
  });
};

TileSpace.prototype.gatherAndDedupeCornersAndEdges = function() {
  // gather and dedupe all corners and edges
  for (var i = 0; i < this.tiles.length; i++) {
    var tile = this.tiles[i];

    if (tile.resource === WATER) {
      continue;
    }

    var corners = tile.shape.getCorners();
    this.corners = _.union(this.corners, corners);

    var edges = tile.shape.getEdges();
    this.edges = _.union(this.edges, edges);
  }
};

TileSpace.prototype.collectNieghboringEdges = function() {
  // build network of neighboring edges
  _.each(this.edges, function(edge) {
    var neighbors = edge.getNeighborEdges(this);
    this.edgeGraph[edge.key()] = neighbors;
  }, this);
};

TileSpace.prototype.collectNieghboringCorners = function() {
  // build network of neighboring corners
  _.each(this.corners, function(corner) {
    this.cornerGraph[corner.key()] = [];
    this.cornerToEdges[corner.key()] = [];
  }, this);

  _.each(this.edges, function(edge) {
    this.cornerGraph[edge.c1.key()].push(edge.c2);
    this.cornerGraph[edge.c2.key()].push(edge.c1);

    this.cornerToEdges[edge.c1.key()].push(edge);
    this.cornerToEdges[edge.c2.key()].push(edge);
  }, this);
};

TileSpace.prototype.markCoastalEdges = function() {
  this.water = [];
  this.land = [];

  var coastalEdges = [];
  var coastalTiles = [];

  _.each(this.tiles, function(tile) {
    if (tile.resource.name === "water") {
      this.water.push(tile);

      var edges = tile.shape.getEdges();
      _.each(edges, function(edge) {
        edge.hasWater = true;
      });
    } else {
      this.land.push(tile);
      var edges = tile.shape.getEdges();
      _.each(edges, function(edge) {
        edge.hasLand = true;
      });
    }
  }, this);

  _.each(this.water, function(tile) {
    var edges = tile.shape.getEdges();

    _.each(edges, function(edge) {
      if (edge.hasLand) {
        coastalEdges.push(edge);
        edge.isCoast = true;
        tile.isCoast = true;
      }
    });

    // add the tile to the list of coasts once.
    if (tile.isCoast) {
      coastalTiles.push(tile);
    }
  }, this);

  this.coastalEdges = coastalEdges;
  this.coastalTiles = coastalTiles;
};
