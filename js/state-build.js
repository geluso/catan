function StateBuild(game, thing) {
  this.game = game;
  this.board = game.board;
}

StateBuild.prototype.execute = function(thing) {
  var player = this.game.currentPlayer;

  if (thing instanceof Corner) {
    var corner = thing;
    var key = corner.key();

    // upgrade settlements to cities
    if (this.board.settlements[key]) {
      if (!Resources.buyCity(player)) {
        $(".messages").text("Can't afford City.");
      } else {
        // remove old settlement
        delete this.board.settlements[key];

        // replace it with the new city;
        var city = new City(corner, "red");
        this.board.cities[key] = city;
      }
    } else {
      if (this.board.settlements[key] instanceof City) {
        return;
      }

      if (!Resources.buySettlement(player)) {
        $(".messages").text("Can't afford Settlement.");
      } else {
        var settlement = new Settlement(corner, "red");
        this.board.settlements[key] = settlement;
      }
    }
  } else if (thing instanceof Edge) {
    if (!Resources.buyRoad(player)) {
      $(".messages").text("Can't afford Road.");
    } else {
      var edge = thing;
      var key = edge.key();

      var road = new Road(edge, "red");
      this.board.roads[key] = road;
    }
  }

  this.game.scores.update();
  this.game.trade.update();

  if (this.game.scores.maxScore >= Scores.GOAL) {
    $(".messages").text(this.game.scores.winText());
  }
}

StateBuild.prototype.shouldGhostRoad = function(edge) {
  var result = false;

  // the road can be placed if it's touching a settlement.
  _.each(this.board.settlements, function(settlement) {
    if (settlement.corner.equals(edge.c1) || settlement.corner.equals(edge.c2)) {
      result = true;
    }
  });

  _.each(this.board.cities, function(city) {
    if (city.corner.equals(edge.c1) || city.corner.equals(edge.c2)) {
      result = true;
    }
  });

  // or if it's touching an existing road network.
  _.each(this.board.roads, function(road) {
    var neighbors = this.board.edgeGraph[road.edge.key()];
    if (_.contains(neighbors, edge)) {
      result = true;
    }
  }, this);

  return result;
};

StateBuild.prototype.shouldGhostCorner = function(corner) {
  var result = true;

  var takenCornerKeys = _.union(
    _.keys(this.board.settlements, this),
    _.keys(this.board.cities
  , this));

  // can't place right next to other settements or citites.
  _.each(takenCornerKeys, function(key) {
    var neighbors = this.board.cornerGraph[key];
    if (_.contains(neighbors, corner)) {
      result = false;
    }
  }, this);

  return result;
};

StateBuild.prototype.shouldGhostRobber = function(tile) {
  return true;
};
