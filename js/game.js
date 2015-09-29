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
  var turn = new StateTurn(this);
  this.turn = turn;

  $("button.roll").click(function() {
    roller.execute();

    // trading is enabled after rolling.
    $("button.trade").attr("disabled", false);
    $("button.roll").attr("disabled", true);
    $("button.endturn").attr("disabled", false);
  });

  var that = this;
  $("button.endturn").click(function() {
    turn.endTurn();

    _.each(that.ais, function(ai) {
      // AIs currently only rolling, enumerate, then end.
      turn.startTurn();
      roller.execute();
      ai.enumerate();
      turn.endTurn();
    });

    // start the turn of the main player.
    turn.startTurn();
  });
}
