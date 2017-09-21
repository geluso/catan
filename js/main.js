$(document).ready(main);

var DEBUG = false;
function debug() {
  DEBUG = true;
}

var space;
var board;
var game;
var screen;

function main() {
  // determine the size
  var width = window.innerWidth;
  var height = window.innerHeight;

  space = new TileSpace().init(width, height);
  board = new SixPlayerBoard().init(space);

  // hanky hacks
  space.curateBoard();
  board.registerTileSpace(space);
  if (board.placePorts) {
    board.placePorts();
  }

  game = new Game(board);
  screen = new Screen(width, height, game);
  screen.draw();
}

function draw() { 
  screen.draw();
}
