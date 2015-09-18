function StatePlace(board, thing) {
  if (StatePlace.state === StatePlace.Start) {
    $(".messages").text("Place your first Settlement.");
    StatePlace.state = StatePlace.FirstSettlement;
    return;
  }

  if (StatePlace.state === StatePlace.Done) {
    return;
  }

  if (StatePlace.state === StatePlace.FirstSettlement ||
      StatePlace.state === StatePlace.SecondSettlement) {
    if (thing instanceof Corner) {
      StatePlace.PlaceSettlement(board, thing);
    } else {
      $(".messages").text("Must place Settlement.");
    }
  } else if (StatePlace.state === StatePlace.FirstRoad ||
             StatePlace.state === StatePlace.SecondRoad) {
    if (thing instanceof Edge) {
      StatePlace.PlaceRoad(board, thing);
    } else {
      $(".messages").text("Must place Road.");
    }
  }

}

StatePlace.PlaceSettlement = function(board, thing) {
  var corner = thing;
  var key = corner.key();

  if (board.settlements[key]) {
    // do nothing. can't build a settlement twice.
    return;
  } else {
    var settlement = new Settlement(corner, "red");
    board.settlements[key] = settlement;

    if (StatePlace.state === StatePlace.FirstSettlement) {
      $(".messages").text("Place your first Road.");
      StatePlace.state = StatePlace.FirstRoad;
    }

    if (StatePlace.state === StatePlace.SecondSettlement) {
      $(".messages").text("Place your second Road.");
      StatePlace.state = StatePlace.SecondRoad;
    }
  }
}

StatePlace.PlaceRoad = function(board, thing) {
  var edge = thing;
  var key = edge.key();

  // if there's no road there yet.
  if (!board.roads[key]) {
    if (StatePlace.state === StatePlace.FirstRoad) {
      StatePlace.placeFirstRoad(board, edge);
    } else if (StatePlace.state === StatePlace.SecondRoad) {
      StatePlace.placeSecondRoad(board, edge);
    }
  }
}

StatePlace.Start = 0;
StatePlace.FirstSettlement = 1;
StatePlace.FirstRoad = 2;
StatePlace.SecondSettlement = 3;
StatePlace.SecondRoad = 4;
StatePlace.Done = 5;

StatePlace.state = StatePlace.FirstSettlement;

StatePlace.placeFirstRoad = function(board, edge) {
  if (board.placeRoad(edge, "red")) {
    $(".messages").text("Place your second Settlement.");
    StatePlace.state = StatePlace.SecondSettlement;
  } else {
    $(".messages").text("Road can't be placed here.");
  }
}

StatePlace.placeSecondRoad = function(board, edge) {
  var road = new Road(edge, "red");
  var key = edge.key();
  board.roads[key] = road;

  $(".messages").text("Roll away!!");

  StatePlace.state = StatePlace.Done;
  board.state = StateBuild;
}

StatePlace.shouldGhostCorner = function(board, corner) {
  var result = false;

  if (StatePlace.state === StatePlace.FirstSettlement ||
      StatePlace.state === StatePlace.SecondSettlement) {
    result = true;

    var takenCornerKeys = _.union(_.keys(board.settlements), _.keys(board.cities));

    // can't place right next to other settements or citites.
    _.each(takenCornerKeys, function(key) {
      var neighbors = board.cornerGraph[key];
      if (_.contains(neighbors, corner)) {
        result = false;
      }
    });
  }

  return result;
};

StatePlace.shouldGhostRoad = function(board, edge) {
  var result = false;

  if (StatePlace.state === StatePlace.FirstRoad ||
      StatePlace.state === StatePlace.SecondRoad) {
    // the road can be placed if it's touching a settlement.
    _.each(board.settlements, function(settlement) {
      if (settlement.corner.equals(edge.c1) || settlement.corner.equals(edge.c2)) {
        result = true;
      }
    });

    _.each(board.cities, function(city) {
      if (city.corner.equals(edge.c1) || city.corner.equals(edge.c2)) {
        result = true;
      }
    });

    // or if it's touching an existing road network.
    _.each(board.roads, function(road) {
      var neighbors = board.edgeGraph[road.edge.key()];
      if (_.contains(neighbors, edge)) {
        result = true;
      }
    });
  }

  return result;
};

StatePlace.shouldGhostRobber = function(board, tile) {
  return false;
};
