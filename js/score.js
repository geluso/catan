function Scores(game) {
  this.game = game;
  this.board = game.board;

  this.scores = {};
  this.update();

  this.maxScore = 0;
  this.leader = MAIN_PLAYER;
}

Scores.prototype.update = function() {
  _.each(this.game.players, function(player) {
    this.scores[player] = 0;
  }, this);

  _.each(this.board.settlements, function(settlement) {
    this.scores[settlement.player] += 1;

    if (this.scores[settlement.player] > this.maxScore) {
      this.maxScore = this.scores[settlement.player];
      this.leader = settlement.player;
    }
  }, this);

  _.each(this.board.cities, function(city) {
    this.scores[city.player] += 2;

    if (this.scores[city.player] > this.maxScore) {
      this.maxScore = this.scores[city.player];
      this.leader = city.player;
    }
  }, this);

  var score = this.scores[MAIN_PLAYER];
  $(".score").text(score);
  return score;
}

Scores.prototype.winText = function() {
  return this.leader + " won with " + this.maxScore + "!!";
}

Scores.GOAL = 10;
