var TOKEN_SIZE = 20;

function Token(value) {
  this.value = value;
}

function TokenGenerator(min, max) {
  this.min = min;
  this.max = max;

  this.randomToken = function() {
    var range = this.max - this.min;

    var value = this.min + Math.round(range * Math.random());
    var token = new Token(value);
    return token;
  };
}

function TokenDrawer(ctx) {
  this.ctx = ctx;

  this.draw = function(token) {
    var radius = TOKEN_SIZE; // Arc radius
    var startAngle = 0; // Starting point on circle
    var endAngle = 2 * Math.PI; // End point on circle

    var path = new Path2D();
    path.arc(0, 0, radius, startAngle, endAngle);

    ctx.fillStyle = "Khaki";
    ctx.fill(path);
    ctx.stroke(path);

    if (token.value === 6 || token.value === 7) {
      ctx.strokeStyle = "red";
    }

    this.ctx.strokeText(token.value, 0, 0);
  }
}
