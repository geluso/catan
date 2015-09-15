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
    ctx.fillRect(-Road.Length / 2, -Road.WIDTH / 2, Road.LENGTH, Road.WIDTH);

    ctx.restore();
  };
}

Road.LENGTH = 20;
Road.WIDTH = 4;
