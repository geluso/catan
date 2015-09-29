var MOUSE_X = 0;
var MOUSE_Y = 0;

function Screen(width, height, game) {
  var canvas = document.getElementById("canvas")
  canvas.width = width;
  canvas.height = height;

  var ctx = canvas.getContext("2d");
  ctx.width = width;
  ctx.height = height;

  this.boardDrawer = new BoardDrawer(ctx, game);

  $(document).mousemove(function(e) {
    MOUSE_X = e.offsetX;
    MOUSE_Y = e.offsetY;

    var thing = game.board.getThing(MOUSE_X, MOUSE_Y);

    if (!(thing instanceof Tile)) {
      game.board.hovering = thing;
    }
  });

  $(document).click(function(e) {
    MOUSE_X = e.offsetX;
    MOUSE_Y = e.offsetY;

    var thing = game.board.getThing(MOUSE_X, MOUSE_Y);

    game.state.execute(thing);
    game.scores.update(game.board);
  });
}

Screen.prototype.draw = function() {
  this.boardDrawer.draw();
};
