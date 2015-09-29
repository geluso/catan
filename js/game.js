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

  var that = this;
  $("button.endturn").click(function() {
    that.endTurn();
  });
}

Game.prototype.endTurn = function() {
  // each AI takes a turn after the player ends their turn.
  _.each(this.ais, function(ai) {
    ai.enumerate();
  });
};
