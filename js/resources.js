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

var RESOURCES = [BRICK, WHEAT, WOOD, SHEEP, ORE];

function ResourceGenerator() {
  this.randomResource = function() {
    var resource = RESOURCES[Math.round((RESOURCES.length - 1)* Math.random())];
    return resource;
  }
}
