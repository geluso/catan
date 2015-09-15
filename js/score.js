function updateScore(board) {
  var score = 0;

  _.each(board.settlements, function() {
    score += 1;
  });

  _.each(board.cities, function() {
    score += 2;
  });

  $(".score").text(score);

  return score;
}
