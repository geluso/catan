function Game(board) {
  this.board = board;

  // set up players
  this.ais = [];

  _.each(PLAYERS, function(playerColor) {
    if (playerColor !== "red") {
      var ai = new AI(this, playerColor);
      this.ais.push(ai);
    }
  }, this);

  // set up resources and trades
  initResources();
  var trade = new Trade();

  this.state = new StatePlace(this);
  this.state.start();

  var roller = new StateRoll(this);
  $("button.roll").click(function() {
    roller.execute();
    updateScore(board);
    trade.updateTradeDisplay();
  });

  $("button.endturn").click(function() {
    game.endTurn();
    updateScore(board);
    trade.updateTradeDisplay();
  });
}
