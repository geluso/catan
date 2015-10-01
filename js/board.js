function Board(rows, cols) {

  this.tileLookup = {};

  this.tiles = [];
  this.edges = [];
  this.corners = [];

  this.edgeGraph = {};
  this.cornerGraph = {};
  this.cornerToEdges = {};

  // a list of all tiles, corners, and edges
  this.everything = [];

  this.roads = {};
  this.settlements = {};
  this.cities = {};

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

      var tile;
      if (row < 2 || row > rows - 3 ||
          col < 2 || col > cols - 4) {
        tile = tileGen.waterTile(x, y);
      } else {
        tile = tileGen.randomTile(x, y);
      }

      this.tiles.push(tile);
      this.tileLookup[row][col] = tile;
    }
  }

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

  // build network of neighboring edges
  var that = this;
  _.each(this.edges, function(edge) {
    var neighbors = edge.getNeighborEdges(that);
    that.edgeGraph[edge.key()] = neighbors;
  });

  // build network of neighboring corners
  _.each(this.corners, function(corner) {
    that.cornerGraph[corner.key()] = [];
    that.cornerToEdges[corner.key()] = [];
  });

  _.each(this.edges, function(edge) {
    that.cornerGraph[edge.c1.key()].push(edge.c2);
    that.cornerGraph[edge.c2.key()].push(edge.c1);

    that.cornerToEdges[edge.c1.key()].push(edge);
    that.cornerToEdges[edge.c2.key()].push(edge);
  });

  this.everything = _.union(this.tiles, this.corners, this.edges);

  // place robber
  var deserts = _.filter(this.tiles, function(tile) {
    return tile.resource === DESERT;
  });

  var nonwater = _.filter(this.tiles, function(tile) {
    return tile.resource !== WATER;
  });

  var robberStart = _.sample(nonwater);
  this.robber = new Robber(robberStart);

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

  this.getThing = function(x1, y1) {
    var closest;
    var minDistance = Infinity;
    for (var i = 0; i < this.everything.length; i++) {
      var x2 = this.everything[i].x;
      var y2 = this.everything[i].y;

      var distance = Point.distance(x1, y1, x2, y2);

      if (distance < minDistance) {
        closest = this.everything[i];
        minDistance = distance;
      }
    }

    return closest;
  }

  this.placeRoad = function(edge, player) {
    var road = new Road(edge, player);
    var key = edge.key();

    if (!this.roads[key]) {
      this.roads[key] = road;
      return true;
    } else {
      return false;
    }
  };
}

Board.prototype.canPlaceSettlement = function(cornerKey) {
  return !this.isCornerOccupied(cornerKey) &&
         this.isTwoAway(cornerKey);
};

Board.prototype.isCornerOccupied = function(cornerKey) {
  return this.settlements[cornerKey] || this.cities[cornerKey];
};

Board.prototype.isTwoAway = function(cornerKey) {
  // assume it is two away from anything, until proven guilty.
  var result = true;

  var neighbors = this.cornerGraph[cornerKey];
  _.each(neighbors, function(neighbor) {
    if (this.isCornerOccupied(neighbor.key())) {
      result = false;
    }
  }, this);

  return result;
};
