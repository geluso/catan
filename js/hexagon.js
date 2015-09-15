function Hexagon(x, y, size) {
  var SIDES = 6;

  this.x = x;
  this.y = y;
  this.size = size;

  this.strokeShape = function(ctx) {
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.moveTo(this.size, 0);

    for (var i = 0; i < SIDES; i++) {
      ctx.rotate(2 * Math.PI / SIDES);
      ctx.lineTo(this.size, 0);
    }
  }

  this.fill = function(ctx, color) {
    color = color || "black";

    ctx.save();

    this.strokeShape(ctx);
    ctx.fillStyle = color;
    ctx.fill();
    
    ctx.restore();
  }

  this.stroke = function(ctx, color) {
    color = color || "black";

    ctx.save();

    this.strokeShape(ctx);
    ctx.strokeStyle = color;
    ctx.stroke();
    
    ctx.restore();
  };

  this.fillStroke = function(ctx, fillColor, strokeColor) {
    ctx.save();

    this.strokeShape(ctx);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
    
    ctx.restore();
  }

  this.getRelativeCorners = function() {
    if (this.x === undefined && this.y === undefined) {
      return [];
    }

    var corners = [];

    yOff = Math.sin(2 * Math.PI / SIDES) * EDGE_LENGTH;
    
    // c1
    var x = HALF_EDGE;
    var y = -yOff;
    corners.push(new Corner(x, y));

    // c2
    x = EDGE_LENGTH;
    y = 0;
    corners.push(new Corner(x, y));

    // c3
    x = HALF_EDGE;
    y = yOff;
    corners.push(new Corner(x, y));

    // c4
    x = -HALF_EDGE;
    y = yOff;
    corners.push(new Corner(x, y));

    // c5
    x = -EDGE_LENGTH;
    y = 0;
    corners.push(new Corner(x, y));

    // c6
    x = -HALF_EDGE;
    y = -yOff;
    corners.push(new Corner(x, y));

    return corners;

  }

  this.getCorners = function() {
    var corners = this.getRelativeCorners();

    for (var i = 0; i < corners.length; i++) {
      corners[i].x += this.x;
      corners[i].y += this.y;
    }

    return corners;
  }

  this.getRelativeEdges = function() {
    if (this.x === undefined && this.y === undefined) {
      return [];
    }

    var corners = this.getRelativeCorners();
    var edges = [];

    edges[0] = new Edge(corners[corners.length - 1], corners[0]);
    edges[1] = new Edge(corners[0], corners[1]);
    edges[2] = new Edge(corners[1], corners[2]);
    edges[3] = new Edge(corners[2], corners[3]);
    edges[4] = new Edge(corners[3], corners[4]);
    edges[5] = new Edge(corners[4], corners[5]);

    return edges;
  };

  this.getEdges = function() {
    var edges = this.getRelativeEdges();

    for (var i = 0; i < edges.length; i++) {
      edges[i].x += this.x;
      edges[i].y += this.y;
    }

    return edges;
  };
}
