function Board(rows, cols) {

  this.tileLookup = {};

  this.tiles = [];
  this.corners = [];
  this.edges = [];

  // a list of all tiles, corners, and edges
  this.everything = [];

  this.roads = [];
  this.settlements = [];
  this.cities = [];


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
}

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
  };
}
