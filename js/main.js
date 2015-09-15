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

    if (thing instanceof Corner) {
      var corner = thing;
      var key = corner.key();

      // upgrade settlements to cities
      if (board.settlements[key]) {
        // remove old settlement
        delete board.settlements[key];

        // replace it with the new city;
        var city = new City(corner, "red");
        board.cities[key] = city;
      } else {
        if (board.settlements[key] instanceof City) {
          return;
        }

        var settlement = new Settlement(corner, "red");
        board.settlements[key] = settlement;
      }
    } else if (thing instanceof Edge) {
      var edge = thing;
      var key = edge.key();

      var road = new Road(edge, "red");
      board.roads[key] = road;
    }
  });

  $(".messages").text("pick your first settlement");

  var board = new Board(rows, cols);
  var boardDrawer = new BoardDrawer(ctx);

  initResources();

  $(".roll").click(function() {
    if (_.size(board.settlements) + _.size(board.cities) === 0) {
      $(".messages").text("choose settlements before rolls will make any effect");
    } else {
      Roll(board);
    }
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
