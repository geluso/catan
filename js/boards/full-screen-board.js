function Board() {
  this.type = "board";

  this.roads = {};
  this.settlements = {};
  this.cities = {};
};

Board.prototype.init = function(tilespace) {
  // make everything available that got refactored from Board to TileSpace
  this.tiles = tilespace.tiles;
  this.edges = tilespace.edges;
  this.corners = tilespace.corners;

  this.edgeGraph = tilespace.edgeGraph;
  this.cornerGraph = tilespace.cornerGraph;
  this.cornerToEdges = tilespace.cornerToEdges;

  this.everything = tilespace.everything;

  this.placeRobber();
  return this;
}

Board.prototype.placeRobber = function() {
  var deserts = _.filter(this.tiles, function(tile) {
    return tile.resource === DESERT;
  });

  var robberStart = _.sample(deserts);
  if (robberStart) {
    this.robber = new Robber(robberStart);
  }
}

Board.prototype.getTile = function(x, y) {
  var tile;

  for (var i = 0; i < this.tiles.length; i++) {
    var xx = Math.abs(this.tiles[i].x - x);
    var yy = Math.abs(this.tiles[i].y - y);
    if (xx < TILE_SIZE && yy < TILE_SIZE) {
      tile = this.tiles[i];
    }
  }

  return tile;
};

Board.prototype.getThing = function(x1, y1) {
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
};

Board.prototype.placeRoad = function(edge, player) {
  var road = new Road(edge, player);
  var key = edge.key();

  if (!this.roads[key]) {
    this.roads[key] = road;
    return true;
  } else {
    return false;
  }
};

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
