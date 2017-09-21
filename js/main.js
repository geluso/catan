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
  document.getElementById("choose-board").addEventListener("click", function(ev) {
    var id = ev.target.id;
    if (id === "fullscreen") {
      newGame(FullscreenBoard);
    } else if (id === "four-players") {
      newGame(FourPlayerBoard);
    } else if (id === "six-players") {
      newGame(SixPlayerBoard);
    }
  });

  // load the game with the SixPlayerBoard by default.
  newGame(SixPlayerBoard);
}

function newGame(board) {
  ClearLog();

  // determine the size
  var width = window.innerWidth;
  var height = window.innerHeight;

  space = new TileSpace().init(width, height);
  board = new board().init(space);

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
