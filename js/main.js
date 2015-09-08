$(document).ready(main);

function main() {
  var canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var ctx = canvas.getContext("2d");

  var rows = canvas.height / TILE_SIZE * 1.5;
  var cols = canvas.width / TILE_SIZE * 1.72;

  var board = new Board(rows, cols);
  var boardDrawer = new BoardDrawer(ctx);

  var loop;
  loop = function() {
    boardDrawer.draw(board);
    window.requestAnimationFrame(loop);
  }

  loop();
}
