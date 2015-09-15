$(document).ready(main);

var DEBUG = false;
function debug() {
  DEBUG = true;
}

var MOUSE_X = 0;
var MOUSE_Y = 0;

function main() {
  var canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var ctx = canvas.getContext("2d");

  var rows = Math.ceil(canvas.height / (TILE_SIZE * 1.72));
  var cols = Math.ceil(canvas.width / (TILE_SIZE * Math.sqrt(2)));

  $(document).mousemove(function(e) {
    MOUSE_X = e.offsetX;
    MOUSE_Y = e.offsetY;
  });

  $(document).click(function(e) {
    MOUSE_X = e.offsetX;
    MOUSE_Y = e.offsetY;

    var thing = board.getThing(MOUSE_X, MOUSE_Y);

    StatePlace(board, thing);
  });

  $(".messages").text("pick your first settlement");

  var board = new Board(rows, cols);
  var boardDrawer = new BoardDrawer(ctx);

  initResources();

  $(".roll").click(function() {
    StateRoll(board);
  });

  var loop;
  loop = function() {
    if (DEBUG) {
      DEBUG = false;
      debugger
    }

    boardDrawer.draw(board);
    window.requestAnimationFrame(loop);
  }

  loop();
}
