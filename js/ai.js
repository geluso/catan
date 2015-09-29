function AI(game, color) {
  this.game = game;
  this.board = game.board;
  this.color = color;
  this.scores = this.evaluatePostions(this.board);
}

AI.prototype.bestAvailableCorner = function() {
  var score = _.find(this.scores, function(corner) {
    return this.board.canPlaceSettlement(corner.key);
  }, this);

  return score.key;
};

AI.prototype.evaluatePostions = function() {
  var scores = {};

  // iterate over each corner with respect to each tile
  _.each(this.board.tiles, function(tile) {
    var corners = tile.shape.getCorners();
    _.each(corners, function(corner) {

      // score each corner.
      if (tile.token) {
        if (!scores[corner.key()]) {
          scores[corner.key()] = 0;
        }
        scores[corner.key()] += AI.valueScore(tile.token.value);
      }

    });
  });

  // prepare the corner-to-score dictionary for sorting.
  scores = _.map(scores, function(value, key) {
    return {"key": key, "score": value};
  });

  scores = _.sortBy(scores, "score");
  scores.reverse();

  return scores;
};

AI.prototype.enumerate = function() {
  var options = _.union(
    this.enumerateRoads(),
    this.enumerateSettlements(),
    this.enumerateCities(),
    this.enumerateTrades()
  );

  // random choices for now.
  if (options.length === 0) {
    console.log(this.color, "ends turn.");
  } else {
    var choice = _.sample(_.union(options));
    if (choice instanceof Actions.BuildRoad) {
      Resources.buyRoad(this.color);
      this.board.placeRoad(choice.edge, this.color);
    }
  }
};

AI.prototype.enumerateRoads = function() {
  if (!Resources.canBuyRoad(this.color)) {
    return [];
  }

  var myRoads = _.filter(this.board.roads, function(road) {
    return road.player === this.color;
  }, this);

  var roadExtensions = [];
  _.each(myRoads, function(road) {
    var neighbors = road.edge.getNeighborEdges(this.board);
    _.each(neighbors, function(neighbor) {
      if (!this.board.roads[neighbor.key()]) {
        roadExtensions.push(
          new Actions.BuildRoad(this.color, neighbor)
        );
      }
    }, this);
  }, this);

  return roadExtensions;
};

AI.prototype.enumerateSettlements = function() {
  if (!Resources.canBuySettlement(this.color)) {
    return [];
  }

  return [];
};

AI.prototype.enumerateCities = function() {
  if (!Resources.canBuyCity(this.color)) {
    return [];
  }

  return [];
};

AI.prototype.enumerateTrades = function() {
  if (!this.game.trade.canTrade(this.color)) {
    return [];
  }

  return [];
};

AI.valueScore = function(value) {
  if (value === 2 || value === 12) {
    return 1;
  } else if (value === 3 || value === 11) {
    return 2;
  } else if (value === 4 || value === 10) {
    return 3;
  } else if (value === 5 || value === 9) {
    return 4;
  } else if (value === 6 || value === 8) {
    return 5;
  } else {
    return 0;
  }
};
