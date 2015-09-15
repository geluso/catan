function Edge(c1, c2) {
  var x = (c1.x + c2.x) / 2;
  var y = (c1.y + c2.y) / 2;
  var p = new Point(x, y);

  var key = [p.x, p.y].join(",");

  if (Edge.lookup[key]) {
    return Edge.lookup[key];
  } else {
    Edge.lookup[key] = this;
  }

  this.x = p.x;
  this.y = p.y;

  this.c1 = c1;
  this.c2 = c2;

  this.angle = angle(c1.x, c1.y, c2.x, c2.y);

  function angle(x0, y0, x1, y1) {
    var angle = Math.atan2(y1 - y0, x1 - x0);
    if (angle < 0) {
      angle = 2 * Math.PI + angle;
    }
    return angle;
  }
}

Edge.lookup = {};
