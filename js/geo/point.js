function Point(x, y) {
  this.x = Math.round(x);
  this.y = Math.round(y);
}

Point.prototype.equals = function(p2) {
  return this.x === p2.x && this.y === p2.y;
};

Point.distance = function(x1, y1, x2, y2) {
  var xx = Math.pow(x1 - x2, 2);
  var yy = Math.pow(y1 - y2, 2);
  var distance = Math.sqrt(xx + yy);
  return distance;
}

Point.draw = function(ctx, x, y, radius) {
  ctx.save();
  ctx.translate(x, y);

  var startAngle = 0; // Starting point on circle
  var endAngle = 2 * Math.PI; // End point on circle

  var path = new Path2D();
  path.arc(0, 0, radius, startAngle, endAngle);

  ctx.fillStyle = "white";
  ctx.fill(path);

  ctx.strokeStyle = "black";
  ctx.stroke(path);

  ctx.restore();
}
