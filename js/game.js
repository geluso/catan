function Game(ctx) {
  this.board = new Board();
  this.tiles = new TileGenerator();

  this.boardDrawer = new BoardDrawer(ctx);

  for (var i = 0; i < 10; i++) {
    var tile = this.tiles.randomTile();
    this.board.addTile(tile);
  }

  this.loop = function() {
    this.boardDrawer.draw(this.board);
    window.requestAnimationFrame(this.loop);
  }
}
