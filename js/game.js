function Game(board) {
  this.board = board;

  // set up players
  this.ais = [];

  // set up resources and trades
  initResources();
  var trade = new Trade();

  this.state = new StatePlace(this);
  this.state.start();

  var roller = new StateRoll(this);
  $(".roll").click(function() {
    roller.execute();
    updateScore(board);
    trade.updateTradeDisplay();
  });

  $(".endturn").click(function() {
    game.endTurn();
    updateScore(board);
    trade.updateTradeDisplay();
  });
}
