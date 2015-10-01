var ROBBER_SIZE = 8;

function RobberDrawer(ctx) {
  this.ctx = ctx;

  this.draw = function(robber) {
    this.ctx.save();

    this.ctx.translate(robber.tile.x + 18, robber.tile.y);

    /// draw robber body
    var body = new Path2D();
    body.moveTo(-10, 20);
    body.lineTo(10, 20);
    body.lineTo(0, -20);
    body.lineTo(-10, 20);

    ctx.fillStyle = "DarkGray";
    ctx.fill(body);
    ctx.stroke(body);

    // draw robber head
    var radius = ROBBER_SIZE; // Arc radius
    var startAngle = 0; // Starting point on circle
    var endAngle = 2 * Math.PI; // End point on circle

    var head = new Path2D();
    head.arc(0, -14, radius, startAngle, endAngle);

    ctx.fillStyle = "DarkGray";
    ctx.fill(head);
    ctx.stroke(head);

    this.ctx.restore();
  }
}
