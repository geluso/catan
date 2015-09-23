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

    var thing = board.getThing(MOUSE_X, MOUSE_Y);

    if (!(thing instanceof Tile)) {
      board.hovering = thing;
    }
  });

  $(document).click(function(e) {
    MOUSE_X = e.offsetX;
    MOUSE_Y = e.offsetY;

    var thing = board.getThing(MOUSE_X, MOUSE_Y);

    board.state.execute(thing);
    updateScore(board);
  });

  var board = new Board(rows, cols);
  var boardDrawer = new BoardDrawer(ctx);

  board.state = new StatePlace(board);
  board.state.start();

  initResources();

  var trade = new Trade();

  var roller = new StateRoll(board);
  $(".roll").click(function() {
    roller.execute();
    updateScore(board);
    trade.updateTradeDisplay();
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
