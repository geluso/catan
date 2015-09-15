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

function initResources() {
  _.each(ALL_RESOURCES, function(resource) {
    var selector = ".resources .resource." + resource.name;
    var style = {'background-color': resource.color};
    $(selector).css(style);

    RESOURCES[resource.name] = 0;
  });

  updateResources();
}

function updateResources() {
  _.each(ALL_RESOURCES, function(resource) {
    var selector = ".resources .value." + resource.name;

    var available = RESOURCES[resource.name];
    $(selector).text(available);
  });
}

function halveResources() {
  _.each(ALL_RESOURCES, function(resource) {
    var available = RESOURCES[resource.name];
    available = Math.ceil(available / 2);
    RESOURCES[resource.name] = available;
  });

  updateResources();
}
