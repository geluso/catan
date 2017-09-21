var LOG_RESOURCES = false;
var ROBBER_LIMIT = 7;

var BRICK = {
  name: "brick",
  color: "Brown"
};

var WHEAT = {
  name: "wheat",
  color: "Gold"
};

var WOOD = {
  name: "wood",
  color: "DarkOliveGreen"
};                

var SHEEP = {
  name: "sheep",
  color: "GreenYellow"
};                

var ORE = {
  name: "ore",
  color: "Gray"
};                

var DESERT = {
  name: "desert",
  color: "Khaki"
};                

var WATER = {
  name: "water",
  color: "CornflowerBlue"
};                

var ALL_RESOURCES = [BRICK, WHEAT, WOOD, SHEEP, ORE];
var RESOURCES = {};

function ResourceGenerator() {
  this.randomResource = function() {
    if (Math.random() < 1 / 20) {
      return DESERT;
    } else {
      var choice = Math.round((ALL_RESOURCES.length - 1)* Math.random());
      var resource = ALL_RESOURCES[choice];
      return resource;
    }
  }
}

function initResources(players) {
  // initialize each player
  _.each(players, function(player) {
    RESOURCES[player] = {};
  });

  // initialize resources for each player
  _.each(players, function(player) {
    _.each(ALL_RESOURCES, function(resource) {
      RESOURCES[player][resource.name] = 0;
    });
  });

  // style the display of resources properly
  _.each(ALL_RESOURCES, function(resource) {
    var selector = ".resources .resource." + resource.name;
    var style = {'background-color': resource.color};
    $(selector).css(style);
  });

  updateResources();
}

function updateResources(players) {
  _.each(ALL_RESOURCES, function(resource) {
    var selector = ".resources .value." + resource.name;

    var available = RESOURCES[MAIN_PLAYER][resource.name];
    $(selector).text(available);
  });

  if (LOG_RESOURCES) {
    console.log("");
    _.each(players, function(player) {
      console.log(totalResources(player), player, RESOURCES[player]);
    });
  }
}

function totalResources(player) {
  var total = 0;
  _.each(ALL_RESOURCES, function(resource) {
    total += RESOURCES[player][resource.name];
  });

  return total;
}

function halveResources(players) {
  _.each(players, function(player) {
    var playerTotal = totalResources(player);
    if (playerTotal > ROBBER_LIMIT) {
      _.each(ALL_RESOURCES, function(resource) {
        // count available
        var available = RESOURCES[player][resource.name];
        available = Math.ceil(available / 2);

        // update what's left
        RESOURCES[player][resource.name] = available;
      });
    }
  });

  updateResources();
}

var Resources = {};

Resources.canBuyRoad = function(player) {
  if (RESOURCES[player][BRICK.name] > 0 && RESOURCES[player][WOOD.name] > 0) {
    return true;
  }
  return false;
}

Resources.buyRoad = function(player) {
  if (Resources.canBuyRoad(player)) {
    GameLog("built Road.", player);

    RESOURCES[player][BRICK.name] = Math.max(0, RESOURCES[player][BRICK.name] - 1);
    RESOURCES[player][WOOD.name] = Math.max(0, RESOURCES[player][WOOD.name] - 1);

    updateResources();
    return true;
  } else {
    return false;
  }
};

Resources.canBuySettlement = function(player) {
  if (RESOURCES[player][BRICK.name] > 0 && RESOURCES[player][WOOD.name] > 0 &&
      RESOURCES[player][WHEAT.name] > 0 && RESOURCES[player][SHEEP.name] > 0) {
    return true;
  }
  return false;
};

Resources.buySettlement = function(player) {
  if (Resources.canBuySettlement(player)) {
    GameLog("built Settlement.", player);

    RESOURCES[player][BRICK.name] = Math.max(0, RESOURCES[player][BRICK.name] - 1);
    RESOURCES[player][WOOD.name] = Math.max(0, RESOURCES[player][WOOD.name] - 1);
    RESOURCES[player][WHEAT.name] = Math.max(0, RESOURCES[player][WHEAT.name] - 1);
    RESOURCES[player][SHEEP.name] = Math.max(0, RESOURCES[player][SHEEP.name] - 1);

    updateResources();
    return true;
  } else {
    return false;
  }
};

Resources.canBuyCity = function(player) {
  if (RESOURCES[player][ORE.name] > 2 && RESOURCES[player][WHEAT.name] > 1) {
    return true;
  }
  return false;
}

Resources.buyCity = function(player) {
  if (Resources.canBuyCity(player)) {
    GameLog("built City.", player);

    RESOURCES[player][ORE.name] = Math.max(0, RESOURCES[player][ORE.name] - 1);
    RESOURCES[player][ORE.name] = Math.max(0, RESOURCES[player][ORE.name] - 1);
    RESOURCES[player][ORE.name] = Math.max(0, RESOURCES[player][ORE.name] - 1);
    RESOURCES[player][WHEAT.name] = Math.max(0, RESOURCES[player][WHEAT.name] - 1);
    RESOURCES[player][WHEAT.name] = Math.max(0, RESOURCES[player][WHEAT.name] - 1);

    updateResources();
    return true;
  } else {
    return false;
  }
};

Resources.resourceFromString = function(name) {
  for (var i = 0; i < ALL_RESOURCES.length; i++) {
    if (ALL_RESOURCES[i].name === name) {
      return ALL_RESOURCES[i];
    }
  }
};
