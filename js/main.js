$(document).ready(main);

var DEBUG = false;
function debug() {
  DEBUG = true;
}

function main() {
  // determine the size
  var width = window.innerWidth;
  var height = window.innerHeight;

  // create the board
  var rows = Math.ceil(height / (TILE_SIZE * 1.72));
  var cols = Math.ceil(width / (TILE_SIZE * Math.sqrt(2)));
  var board = new Board(rows, cols);

  var game = new Game(board);
  var screen = new Screen(width, height, game);

  var loop;
  loop = function() {
    if (DEBUG) {
      DEBUG = false;
      debugger
    }

    screen.draw();
    window.requestAnimationFrame(loop);
  }

  loop();
}
