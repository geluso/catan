function City(corner, player) {
  this.corner = corner;
  this.player = player;
}

function CityDrawer(ctx) {
  this.ctx = ctx;

  this.drawCities = function(cities) {
    this.ctx.save();

    for (var corner in cities) {
      var city = cities[corner];
      this.draw(city);
    }

    this.ctx.restore();
  };

  this.draw = function(city) {
    var x = city.corner.x - City.WIDTH / 2;
    var y = city.corner.y - City.HEIGHT / 2;

    this.ctx.fillStyle = city.player;
    this.ctx.fillRect(x, y, City.WIDTH, City.HEIGHT);
    this.ctx.strokeRect(x, y, City.WIDTH, City.HEIGHT);
  };

  this.ghost = function(corner) {
    this.ctx.globalAlpha = .5;
    this.draw({corner: corner, player: "red"});
    this.ctx.globalAlpha = 1;
  }
}
