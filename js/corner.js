function Corner(x, y) {
  var key = [x,y].join(",");

  if (Corner.lookup[key]) {
    return Corner.lookup[key];
  } else {
    Corner.lookup[key] = this;
  }

  var p = new Point(x, y);
  this.x = p.x;
  this.y = p.y;
}

Corner.lookup = {};
