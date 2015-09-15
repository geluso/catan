var TOKEN_SIZE = 16;

function Token(value) {
  this.value = value;
}

function TokenGenerator(min, max) {
  this.min = min;
  this.max = max;

  this.randomToken = function() {
    var range = this.max - this.min - 1;

    var value = this.min + Math.round(range * Math.random());

    // bump sevens up
    if (value > 6) {
      value++
    }

    var token = new Token(value);
    return token;
  };
}

function TokenDrawer(ctx) {
  this.ctx = ctx;

  this.draw = function(token, x, y) {
    this.ctx.save();

    this.ctx.translate(x, y);

    var radius = TOKEN_SIZE; // Arc radius
    var startAngle = 0; // Starting point on circle
    var endAngle = 2 * Math.PI; // End point on circle

    var path = new Path2D();
    path.arc(0, 0, radius, startAngle, endAngle);

    ctx.fillStyle = "Khaki";
    ctx.fill(path);
    ctx.stroke(path);

    if (token.value === 6 || token.value === 8) {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = "black";
    }

    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.font = "15px sans-serif";
    this.ctx.fillText(token.value, 0, 0);

    this.drawDots(token.value);

    this.ctx.restore();
  }

  this.drawDots = function(value) {
    var dots, offset;
    if (value === 2 || value === 12) {
      dots = 1;
      offset = 0;
    } else if (value === 3 || value === 11) {
      dots = 2;
      offset = 1;
    } else if (value === 4 || value === 10) {
      dots = 3;
      offset = 3;
    } else if (value === 5 || value === 9) {
      dots = 4;
      offset = 4;
    } else if (value === 6 || value === 8) {
      dots = 5;
      offset = 6;
    }

    for (var i = 0; i < dots; i++)  {
      var radius = 1; // Arc radius
      var startAngle = 0; // Starting point on circle
      var endAngle = 2 * Math.PI; // End point on circle

      var path = new Path2D();
      path.arc(i * 3 - offset, 9, radius, startAngle, endAngle);

      ctx.fillStyle = "Black";
      ctx.fill(path);
    }
  }
}
