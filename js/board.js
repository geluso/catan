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

  this.ais = [];

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

  _.each(PLAYERS, function(playerColor) {
    if (playerColor !== "red") {
      var ai = new AI(this, playerColor);
      this.ais.push(ai);
    }
  }, this);

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

function BoardDrawer(ctx) {
  this.ctx = ctx;

  var tileDrawer = new TileDrawer(ctx);
  var roadDrawer = new RoadDrawer(ctx);
  var settlementDrawer = new SettlementDrawer(ctx);
  var cityDrawer = new CityDrawer(ctx);

  this.draw = function(board) {
    this.ctx.save();

    tileDrawer.drawTiles(board.tiles);
    roadDrawer.drawRoads(board.roads);
    settlementDrawer.drawSettlements(board.settlements);
    cityDrawer.drawCities(board.cities);

    for (var i = 0; i < board.everything.length; i++) {
      if (board.everything[i].hover) {
        var thing = board.everything[i];

        Point.draw(this.ctx, thing.x, thing.y, 4);
      }
    }

    if (board.hovering) {
      var thing = board.hovering;
      if (thing instanceof Corner) {
        if (board.state.shouldGhostCorner(thing)) {
          var corner = thing;
          var key = corner.key();

          // if there's no settlement nor city.
          if (!board.settlements[key] && !board.cities[key]) {
            var settlement = board.settlements[key];
            settlementDrawer.ghost(corner)
          // if there's only no city.
          } else if (!board.cities[key]) {
            var city = board.cities[key];
            cityDrawer.ghost(corner)
          }
        }
      } else if (thing instanceof Edge) {
        if (board.state.shouldGhostRoad(thing)) {
          var edge = thing;
          var key = edge.key();

          var road = board.roads[edge];
          if (!road) {
            roadDrawer.ghost(edge);
          }
        }
      } else if (thing instanceof Tile) {
        if (board.state.shouldGhostRobber(thing)) {

        }
      }

    }
  };
}
