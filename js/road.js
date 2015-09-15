var ROAD_LENGTH = 20;
var ROAD_WIDTH = 4;

function Road(edge, player) {
  this.edge = edge;
  this.player = player;
}

function RoadDrawer(ctx) {
  this.ctx = ctx;

  this.drawRoads = function(roads) {
    this.ctx.save();

    for (var i = 0; i < roads.length; i++) {
      var road = roads[i];
      this.draw(road);
    }

    this.ctx.restore();
  };

  this.draw = function(road) {
    var x = road.edge.x;
    var y = road.edge.y;

    ctx.save();

    ctx.fillStyle = "black";
    ctx.fill(path);

    ctx.translate(x, y);
    ctx.rotate(road.edge.angle);
    ctx.fillRect(-ROAD_LENGTH / 2, -ROAD_WIDTH / 2, ROAD_LENGTH, ROAD_WIDTH);

    ctx.restore();
  };
}
