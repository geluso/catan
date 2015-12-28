$(document).ready(main);

var DEBUG = false;
function debug() {
  DEBUG = true;
}

function main() {
  // determine the size
  var width = window.innerWidth;
  var height = window.innerHeight;

  var space = new TileSpace().init(width, height);
  var board = new SixPlayerBoard().init(space);

  // hanky hacks
  space.curateBoard();
  board.registerTileSpace(space);

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
