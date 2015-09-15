function Line(p1, p2) {
  this.p1 = p1;
  this.p2 = p2;

  this.midpoint = {
    x: (this.p1.x + this.p2.x) / 2,
    y: (this.p1.y + this.p2.y) / 2,
  }

  this.angle = angle(p1.x, p1.y, p2.x, p2.y);

  function angle(x0, y0, x1, y1) {
    var angle = Math.atan2(y1 - y0, x1 - x0);
    if (angle < 0) {
      angle = 2 * Math.PI + angle;
    }
    return angle;
  }

}
