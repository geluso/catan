function Scores(game) {
  this.game = game;
  this.board = game.board;

  this.scores = {};
  this.update();

  this.maxScore = 0;
  this.leader = MAIN_PLAYER;

  this.currentLongestRoad = undefined;
}

Scores.prototype.update = function() {
  _.each(this.game.players, function(player) {
    this.scores[player] = 0;
  }, this);

  _.each(this.board.settlements, function(settlement) {
    this.scores[settlement.player] += 1;
  }, this);

  _.each(this.board.cities, function(city) {
    this.scores[city.player] += 2;
  }, this);

  // determine longest road.
  var longestRoad = this.board.longestRoad();
  if (longestRoad.length >= MIN_LONGEST_ROAD) {
    // mark the roads in the best chain as the longest road
    _.each(longestRoad, function(road) {
      road.longest = true;
    });

    // award points to the player with the longest road.
    var player = longestRoad[0].player;
    this.scores[player] += 2;

    if (player !== this.currentLongestRoad) {
      GameLog("got longest road!", player);
      this.currentLongestRoad = player;
    }
  }

  // find out who is in the lead.
  _.each(this.game.players, function(player) {
    if (this.scores[player] > this.maxScore) {
      this.maxScore = this.scores[player];
      this.leader = player;
    }
  }, this);

  this.buildScoreboard();
}


Scores.prototype.buildScoreboard = function() {
  // destroy old scoreboard
  var scoreboard = document.getElementById("scoreboard");
  while(scoreboard.lastChild) {
    scoreboard.removeChild(scoreboard.lastChild);
  }

  // build up new scores for each player
  _.each(this.scores, function(points, player) {
    var color = document.createElement("div");
    color.className = "player";
    color.style.backgroundColor = player;

    var score = document.createElement("div");
    score.className = "score";
    score.textContent = points;

    var scoreContainer = document.createElement("div");
    scoreContainer.appendChild(color);
    scoreContainer.appendChild(score);

    scoreboard.appendChild(scoreContainer);
  }, this);
};

Scores.prototype.winText = function() {
  return "won with " + this.maxScore + "!!";
}

Scores.GOAL = 10;
