function City(corner, player) {
  this.corner = corner;
  this.player = player;
}

function CityDrawer(ctx) {
  this.ctx = ctx;

  this.drawCities = function(cities) {
    this.ctx.save();

    for (var i = 0; i < cities.length; i++) {
      var city = cities[i];
      this.draw(city);
    }

    this.ctx.restore();
  };

  this.draw = function(city) {
    var x = city.corner.x;
    var y = city.corner.y;

    this.ctx.save();
    this.ctx.translate(x, y);

    this.ctx.fillStyle = city.player;
    this.ctx.fillRect(x, y, City.WIDTH, City.HEIGHT);
    this.ctx.strokeRect(x, y, City.WIDTH, City.HEIGHT);

    this.ctx.restore();
  };
}

City.WIDTH = 2 * .2 * TILE_SIZE;
City.HEIGHT = .2 * TILE_SIZE;

