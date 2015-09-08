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

  var game = new Game(ctx);
  game.loop();
}
