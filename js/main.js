$(document).ready(main);

var WIDTH = 600;
var HEIGHT = WIDTH;

function main() {
  var canvas = document.getElementById("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  var ctx = canvas.getContext("2d");

  //$(canvas).click(click);
  //$(canvas).mousemove(mousemove);

  var board = new Board(10,10);
  var boardDrawer = new BoardDrawer(ctx);

  var loop;
  loop = function() {
    boardDrawer.draw(board);
    window.requestAnimationFrame(loop);
  }

  loop();
}
