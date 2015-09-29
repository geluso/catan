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

  this.currentPlayer = MAIN_PLAYER;

  // set up resources
  initResources();

  // set up trade and score
  this.trade = new Trade();
  this.scores = new Scores(this);

  // begin game with first state
  this.state = new StatePlace(this);
  this.state.start();

  var that = this;
  var roller = new StateRoll(this);
  $("button.roll").click(function() {
    roller.execute();
  });

  $("button.endturn").click(function() {
    game.endTurn();
  });
}
