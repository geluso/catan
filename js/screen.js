var MOUSE_X = 0;
var MOUSE_Y = 0;

var LAST_THING;

function Screen(width, height, game) {
  this.dirty = true;
  this.game = game;

  var canvas = document.getElementById("canvas")
  canvas.width = width;
  canvas.height = height;

  var ctx = canvas.getContext("2d");
  ctx.width = width;
  ctx.height = height;

  var boardDrawer = new BoardDrawer(ctx, game);
  this.boardDrawer = boardDrawer;

  $(document).mousemove(this.handleMousemove);
  $(document).click(this.handleClick);
}

Screen.prototype.handleMousemove = function(e) {
  MOUSE_X = e.offsetX;
  MOUSE_Y = e.offsetY;

  var thing = SCREEN.game.board.getThing(MOUSE_X, MOUSE_Y);

  SCREEN.dirty = false;
  if (thing !== LAST_THING) {
    SCREEN.dirty = true;
    if (!(thing instanceof Tile)) {
      SCREEN.game.board.hovering = thing;
      SCREEN.boardDrawer.draw();
    }
  }
}

Screen.prototype.handleClick = function(e) {
  MOUSE_X = e.offsetX;
  MOUSE_Y = e.offsetY;

  var thing = SCREEN.game.board.getThing(MOUSE_X, MOUSE_Y);

  SCREEN.dirty = false;
  if (thing !== LAST_THING) {
    SCREEN.dirty = true;
    SCREEN.game.state.execute(thing);
    SCREEN.game.scores.update(SCREEN.game.board);
    SCREEN.boardDrawer.draw();
  }
}

Screen.prototype.draw = function() {
  SCREEN.boardDrawer.draw();
};

Screen.prototype.destoryHandlers = function() {
  document.removeEventListener("mousemove", this.handleMousemove);
  document.removeEventListener("click", this.handleClick);
};
