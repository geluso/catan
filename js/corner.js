function Corner(x, y) {
  var p = new Point(x, y);
  this.x = p.x;
  this.y = p.y;

  var key = this.key();
  if (Corner.lookup[key]) {
    return Corner.lookup[key];
  } else {
    Corner.lookup[key] = this;
  }
}

Corner.prototype.key = function() {
  var key = [this.x, this.y].join(",");
  return key;
}             

Corner.lookup = {};
