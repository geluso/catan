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
  var roads = this.enumerateRoads();
  var settlements = this.enumerateSettlements();
  var cities = this.enumerateCities();

  var allOptions = _.union(roads, settlements, cities);
  //var choice = _.sample(_.union(options));

  // random choices for now.
  if (allOptions.length === 0) {
    if (this.game.trade.canTrade(this.color)) {
      this.trade();
    } else {
      if (LOG_EMPTY_TURNS) {
        console.log(this.color, "can't do anything.");
      }
    }
  } else {
    if (cities.length > 0) {
      if (LOG_BUILDS) {
        console.log(this.color, "builds city.");
      }

      // pay for it.
      Resources.buyCity(this.color);

      // build it.
      var choice = _.sample(cities);
      var city = new City(choice.corner, this.color);
      this.board.cities[choice.corner.key()] = city;

    } else if (settlements.length > 0) {
      if (LOG_BUILDS) {
        console.log(this.color, "builds settlement.");
      }

      // pay for it.
      Resources.buySettlement(this.color);

      // build it.
      var choice = _.sample(settlements);
      var settlement = new Settlement(choice.corner, this.color);
      this.board.settlements[choice.corner.key()] = settlement;

    } else if (roads.length > 0) {
      if (LOG_BUILDS) {
        console.log(this.color, "builds road.");
      }

      var choice = _.sample(roads);
      Resources.buyRoad(this.color);
      this.board.placeRoad(choice.edge, this.color);
    }
  }
};

AI.prototype.roads = function() {
  var roads = _.filter(this.board.roads, function(road) {
    return road.player === this.color;
  }, this);

  return roads;
};

AI.prototype.enumerateRoads = function() {
  if (!Resources.canBuyRoad(this.color)) {
    return [];
  }

  var roads = this.roads();
  var roadExtensions = [];

  _.each(roads, function(road) {
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

AI.prototype.settlements = function() {
  var settlements = _.filter(this.board.settlements, function(settlement) {
    return settlement.player === this.color;
  }, this);

  return settlements;
};

AI.prototype.enumerateSettlements = function() {
  if (!Resources.canBuySettlement(this.color)) {
    return [];
  }

  var roads = this.roads();
  var newSettlements = [];

  _.each(roads, function(road) {
    if (this.board.canPlaceSettlement(road.edge.c1.key())) {
      var action = new Actions.BuildSettlement(this.color, road.edge.c1)
      newSettlements.push(action);
    }

    if (this.board.canPlaceSettlement(road.edge.c2.key())) {
      var action = new Actions.BuildSettlement(this.color, road.edge.c2)
      newSettlements.push(action);
    }
  }, this);

  return [];
};

AI.prototype.enumerateCities = function() {
  if (!Resources.canBuyCity(this.color)) {
    return [];
  }

  // any settlement can be upgraded to a city.
  var settlements = this.settlements();
  var newCities = _.map(settlements, function(settlement) {
    return new Actions.BuildCity(this.color, settlement.corner);
  }, this);

  return newCities;
};

AI.prototype.trade = function() {
  var max = 0;
  var min = Infinity;
  var resources = RESOURCES[this.color];

  _.each(ALL_RESOURCES, function(resource) {
    max = Math.max(max, resources[resource.name]);
    min = Math.min(min, resources[resource.name]);
  });

  var maxResources = [];
  var minResources = [];

  _.each(ALL_RESOURCES, function(resource) {
    if (resources[resource.name] === max) {
      maxResources.push(resource);
    }

    if (resources[resource.name] === min) {
      minResources.push(resource);
    }
  });

  var give = _.sample(maxResources);
  var get = _.sample(minResources);

  this.game.trade.bankTrade(this.color, give, get);
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
