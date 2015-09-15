function Road(edge, player) {
  this.edge = edge;
  this.player = player;
}

function RoadDrawer(ctx) {
  this.ctx = ctx;

  this.drawRoads = function(roads) {
    this.ctx.save();

    for (var edge in roads) {
      var road = roads[edge];
      this.draw(road);
    }

    this.ctx.restore();
  };

  this.draw = function(road) {
    var x = road.edge.x;
    var y = road.edge.y;

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(road.edge.angle);

    ctx.fillStyle = road.player;
    ctx.fillRect(-Road.LENGTH / 2, -Road.WIDTH / 2, Road.LENGTH, Road.WIDTH);
    ctx.strokeRect(-Road.LENGTH / 2, -Road.WIDTH / 2, Road.LENGTH, Road.WIDTH);

    ctx.restore();
  };

  this.ghost = function(edge) {
    this.ctx.globalAlpha = .5;
    this.draw({edge: edge, player: "red"});
    this.ctx.globalAlpha = 1;
  }
}

Road.LENGTH = 20;
Road.WIDTH = 4;
