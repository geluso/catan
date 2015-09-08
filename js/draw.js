var CTX;

var WIDTH = (GRID) * SIZE;
var HEIGHT = WIDTH;

var TOKEN_SIZE = 30;
var SIDES = 6;

function drawBoard(tiles) {
  CTX.fillStyle = "aqua";
  CTX.fillRect(0, 0, WIDTH, HEIGHT);

  for (var i = 0; i < tiles.length; i++) {
    drawTile(tile);
  }

  window.requestAnimationFrame(drawBoard);
}

function drawStone(cell) {
  var radius = STONE_SIZE / 2; // Arc radius
  var startAngle = 0; // Starting point on circle
  var endAngle = 2 * Math.PI; // End point on circle

  var xx = SIZE / 2 + cell.x * SIZE;
  var yy = SIZE / 2 + cell.y * SIZE;

  var path = new Path2D();
  path.arc(xx, yy, radius, startAngle, endAngle);

  CTX.fillStyle = cell.stone.color;

  CTX.fill(path);
  CTX.stroke(path);
}

function drawHover() {
  var x = MOUSE_X - SIZE / 2;
  var y = MOUSE_Y - SIZE / 2;

  var xx = Math.round(x / SIZE) * SIZE + SIZE / 2;
  var yy = Math.round(y / SIZE) * SIZE + SIZE / 2;

  var radius = STONE_SIZE / 2; // Arc radius
  var startAngle = 0; // Starting point on circle
  var endAngle = 2 * Math.PI; // End point on circle

  var path = new Path2D();
  path.arc(xx, yy, radius, startAngle, endAngle);

  var color;
  if (TURN === "black") {
    color = "rgba(0,0,0, .7)";
  } else {
    color = "rgba(255,255,255, .7)";
  }

  CTX.fillStyle = color;
  CTX.fill(path);

  CTX.strokeStyle = "rgba(0,0,0,.7)";
  CTX.stroke(path);
}

