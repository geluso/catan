var MOUSE_X = 0;
var MOUSE_Y = 0;

var LAST_THING;

function Screen(width, height, game) {
  this.dirty = true;

  var canvas = document.getElementById("canvas")
  canvas.width = width;
  canvas.height = height;

  var ctx = canvas.getContext("2d");
  ctx.width = width;
  ctx.height = height;

  var boardDrawer = new BoardDrawer(ctx, game);
  this.boardDrawer = boardDrawer;

  $(document).mousemove(function(e) {
    MOUSE_X = e.offsetX;
    MOUSE_Y = e.offsetY;

    var thing = game.board.getThing(MOUSE_X, MOUSE_Y);

    this.dirty = false;
    if (thing !== LAST_THING) {
      this.dirty = true;
      if (!(thing instanceof Tile)) {
        game.board.hovering = thing;
        boardDrawer.draw();
      }
    }
  });

  $(document).click(function(e) {
    MOUSE_X = e.offsetX;
    MOUSE_Y = e.offsetY;

    var thing = game.board.getThing(MOUSE_X, MOUSE_Y);

    this.dirty = false;
    if (thing !== LAST_THING) {
      this.dirty = true;
      game.state.execute(thing);
      game.scores.update(game.board);
      boardDrawer.draw();
    }
  });
}

Screen.prototype.draw = function() {
  this.boardDrawer.draw();

};
