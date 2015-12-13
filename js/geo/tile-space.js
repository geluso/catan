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
  this.rows = Math.ceil(height / (TILE_SIZE * 1.72));
  this.cols = Math.ceil(width / (TILE_SIZE * Math.sqrt(2)));

  this.createHexagons();

  this.gatherAndDedupeCornersAndEdges();
  this.collectNieghboringEdges();
  this.collectNieghboringCorners();

  // make a list containing every tile, corner and edge on the board.
  this.everything = _.union(this.tiles, this.corners, this.edges);

  return this;
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

      var tile;
      if (row < 2 || row > this.rows - 3 ||
          col < 2 || col > this.cols - 4) {
        tile = tileGen.waterTile(x, y);
      } else {
        tile = tileGen.randomTile(x, y);
      }

      this.tiles.push(tile);
    }
  }
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

