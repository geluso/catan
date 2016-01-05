var MIN_LONGEST_ROAD = 5;

function Board() {
  this.type = "board";
  this.players = 6;

  this.roads = {};
  this.settlements = {};
  this.cities = {};
};

Board.prototype.init = function(tilespace) {
  this.registerTileSpace(tilespace);

  this.placeRobber();
  return this;
}

Board.prototype.registerTileSpace = function(tilespace) {
  // make everything available that got refactored from Board to TileSpace
  this.tilespace = tilespace;

  this.tiles = tilespace.tiles;
  this.edges = tilespace.edges;
  this.corners = tilespace.corners;

  this.edgeGraph = tilespace.edgeGraph;
  this.cornerGraph = tilespace.cornerGraph;
  this.cornerToEdges = tilespace.cornerToEdges;

  this.everything = tilespace.everything;
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

Board.prototype.longestRoad = function() {
  var bestChain = [];
  _.each(this.roads, function(road) {
    var key = road.key();
    var road = this.roads[key];
    var currentPlayer = this.roads[key].player;

    // reset the longest property for each road as they're all counted.
    road.longest = false;

    var c1 = road.edge.c1;
    var c2 = road.edge.c2;

    var visited = {};
    visited[key] = true;

    var chain1 = [road];
    var chain2 = [road];

    var chain1 = this.countRoadByCorner(c1, currentPlayer, visited, chain1);
    var chain2 = this.countRoadByCorner(c2, currentPlayer, visited, chain2);

    if (chain1.length > bestChain.length) {
      bestChain = chain1;
    }

    if (chain2.length > bestChain.length) {
      bestChain = chain2;
    }
  }, this);

  return bestChain;
};

Board.prototype.countRoadByCorner = function(corner, currentPlayer, visited, chain) {
  var key = corner.key();
  var roads = _.filter(this.roads, function(road) {
    // only consider roads owned by the current player
    if (road.player !== currentPlayer) {
      return false;
    }

    // don't return any roads that have already been visited.
    if (visited[road.key()]) {
      return false;
    }
    
    // only return roads that share a corner with the original corner.
    return road.edge.c1.key() === key || road.edge.c2.key() === key;
  }, this);


  var bestChain = chain;

  _.each(roads, function(road) {
    // mark the road as visited.
    visited[road.key()] = true;

    // get the corners
    var c1 = road.edge.c1;
    var c2 = road.edge.c2;

    var chain1 = chain.slice();
    var chain2 = chain.slice();

    chain1.push(road);
    chain2.push(road);

    if (c1.key() !== corner.key()) {
      chain1 = this.countRoadByCorner(c1, currentPlayer, visited, chain1);
    }

    if (c2.key() !== corner.key()) {
      chain2 = this.countRoadByCorner(c2, currentPlayer, visited, chain2);
    }

    if (chain1.length > bestChain.length) {
      bestChain = chain1;
    }
    
    if (chain2.length > bestChain.length) {
      bestChain = chain2;
    }
  }, this);

  return bestChain;
};
