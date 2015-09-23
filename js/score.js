function updateScore(board) {
  var scores = {};
  _.each(PLAYERS, function(playerColor) {
    scores[playerColor] = 0;
  });

  _.each(board.settlements, function(settlement) {
    scores[settlement.player] += 1;
  });

  _.each(board.cities, function(city) {
    scores[city.player] += 2;
  });

  var score = scores[PLAYERS[0]];
  $(".score").text(score);
  return score;
}
