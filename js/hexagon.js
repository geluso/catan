function Hexagon(x, y, size) {
  var SIDES = 6;

  var p = new Point(x, y);
  this.x = p.x;
  this.y = p.y;

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
    var corner = new Corner(x, y);
    corners.push(corner);

    // c2
    x = EDGE_LENGTH;
    y = 0;
    corner = new Corner(x, y);
    corners.push(corner);

    // c3
    x = HALF_EDGE;
    y = yOff;
    corner = new Corner(x, y);
    corners.push(corner);

    // c4
    x = -HALF_EDGE;
    y = yOff;
    corner = new Corner(x, y);
    corners.push(corner);

    // c5
    x = -EDGE_LENGTH;
    y = 0;
    corner = new Corner(x, y);
    corners.push(corner);

    // c6
    x = -HALF_EDGE;
    y = -yOff;
    corner = new Corner(x, y);
    corners.push(corner);

    return corners;

  }

  this.getCorners = function() {
    var corners = this.getRelativeCorners();

    for (var i = 0; i < corners.length; i++) {
      var corner = corners[i];
      corners[i] = new Corner(corner.x + this.x, corner.y + this.y);
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
      var edge = edges[i];
      var c1 = {x: edge.c1.x + this.x, y: edge.c1.y + this.y};
      var c2 = {x: edge.c2.x + this.x, y: edge.c2.y + this.y};
      edges[i] = new Edge(c1, c2);
    }

    return edges;
  };
}
