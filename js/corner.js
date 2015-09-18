function Corner(x, y) {
  this.p = new Point(x, y);
  this.x = this.p.x;
  this.y = this.p.y;

  var key = this.key();
  if (Corner.lookup[key]) {
    return Corner.lookup[key];
  } else {
    Corner.lookup[key] = this;
  }

  this.equals = function(c2) {
    return this.p.equals(c2.p);
  };
}

Corner.prototype.key = function() {
  var key = [this.x, this.y].join(",");
  return key;
};

Corner.lookup = {};
