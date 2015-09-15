function Board(rows, cols) {

  this.tileLookup = {};

  this.tiles = [];

  this.roads = [];
  this.settlements = [];
  this.cities = [];

  this.corners = [];
  this.edges = [];

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

  // gather all corners and edges
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

  function inspectForDupes(list) {
    var threshold = 30;

    var dupes = 0;
    var totalDistance = 0;
    var maxDistance = 0;

    for (var i = 0; i < list.length; i++) {
      var c1 = list[i];
      for (var j = 0; j < list.length; j++) {
        var c2 = list[j];
        if (c1 !== c2) {
          var xx = c1.x - c2.x;
          var yy = c1.y - c2.y;

          var distance = Math.sqrt(Math.pow(xx, 2) + Math.pow(yy, 2));

          if (distance < threshold) {
            dupes++;
            totalDistance += distance
            maxDistance = Math.max(distance, maxDistance);
            console.log("dupe:", c1, c2);
          }
        }
      }
    }

    var aveDistance = totalDistance / list.length;

    console.log("total dupes:", dupes);
    console.log("ave dis:", aveDistance);
    console.log("max   dis:", maxDistance);
  }

  console.log("inspecting corners:", this.corners.length);
  inspectForDupes(this.corners);
  console.log("");

  console.log("inspecting edges", this.edges.length);
  inspectForDupes(this.edges);
  console.log("");

  debugger

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

    this.ctx.clearRect(0, 0, 2000, 3000);

    for (var i = 0; i < board.corners.length; i++) {
      var corner = board.corners[i];
      this.ctx.font="12px Arial";
      this.ctx.fillText(i, corner.x, corner.y);
    }

    for (var i = 0; i < board.edges.length; i++) {
      var edge = board.edges[i];
      this.ctx.font="12px Arial";
      this.ctx.fillText(i, edge.x, edge.y);
    }

    this.ctx.restore();
  };
}
