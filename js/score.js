function Scores(game) {
  this.game = game;
  this.board = game.board;

  this.scores = {};
  this.update();

  this.maxScore = 0;
  this.leader = MAIN_PLAYER;
}

Scores.prototype.update = function() {
  _.each(PLAYERS, function(playerColor) {
    this.scores[playerColor] = 0;
  }, this);

  _.each(this.board.settlements, function(settlement) {
    this.scores[settlement.player] += 1;

    if (this.scores[settlement.playerColor] > this.maxScore) {
      this.maxScore = this.scores[settlement.playerColor];
      this.leader = settlement.playerColor;
    }
  }, this);

  _.each(this.board.cities, function(city) {
    this.scores[city.player] += 2;

    if (this.scores[city.playerColor] > this.maxScore) {
      this.maxScore = this.scores[city.playerColor];
      this.leader = city.playerColor;
    }
  }, this);

  var score = this.scores[PLAYERS[0]];
  $(".score").text(score);
  return score;
}

Scores.prototype.winText = function() {
  return this.leader + " won with " + this.maxScore + "!!";
}

Scores.GOAL = 10;
