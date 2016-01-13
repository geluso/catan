function SixPlayerBoard() {
  this.type = "Six";
  this.players = 6;
}

SixPlayerBoard.prototype = new Board();

SixPlayerBoard.prototype.init = function(tilespace) {
  // Let the original Board set up itself.
  Board.prototype.init.call(this, tilespace);

  // define what resources are available
  var resources = [
    DESERT, DESERT,
    BRICK, BRICK, BRICK, BRICK, BRICK,
    ORE, ORE, ORE, ORE, ORE,
    WOOD, WOOD, WOOD, WOOD, WOOD, WOOD,
    SHEEP, SHEEP, SHEEP, SHEEP, SHEEP, SHEEP,
    WHEAT, WHEAT, WHEAT, WHEAT, WHEAT, WHEAT,
  ];

  // shuffle the resources
  resources = _.shuffle(resources);

  // make a mutable copy of the token arrangement
  var tokens = this.TOKEN_ARRANGEMENT.slice();

  // keep track of all the deserts on the board so we can place
  // the robber on a random one later
  var deserts = [];

  // use the relative tile arrangement with the tile we found to be in the center
  // to look up all other tiles.
  _.each(this.RELATIVE_TILE_ARRANGEMENT, function(position) {
    // Get the tile and place a resource on it.
    var x = position.x + tilespace.centerTile.x;
    var y = position.y + tilespace.centerTile.y;

    var tile = this.getTile(x, y);
    tile.resource = resources.pop(0);

    // Place a token on every tile but the desert.
    if (tile.resource !== DESERT) {
      var value = tokens.shift();
      tile.token = new Token(value);
    // Place the robber on the desert.
    } else {
      deserts.push(tile);
    }
  }, this);

  // place the robber in a random desert
  var desert = _.sample(deserts);
  this.robber = new Robber(desert);

  return this;
}

SixPlayerBoard.prototype.placePorts = function() {
  // the minimum number of edges between each port.
  var portSpace = Math.floor(this.tilespace.coastalEdges.length / this.NUMBER_OF_PORTS);

  // a random offset that shifts where ports are placed in the sequence.
  // this prevents ports from always appearing in the same place.
  var offset = _.sample([1,2]);

  // keep track of how many ports have been placed already.
  var ports = 0;

  // guarantee there are is at least one special port for each resource
  var portTypes = [BRICK, WHEAT, ORE, SHEEP, WOOD];

  // fill the remaining port slots with basic default 3:1 ports
  while (portTypes.length < this.NUMBER_OF_PORTS) {
    portTypes.push({name: "default", color: "white", ratio: 3});
  }

  portTypes = _.shuffle(portTypes);

  for (var i = 0; i < this.tilespace.coastalEdges.length; i++) {
    if (i % portSpace === offset && ports < this.NUMBER_OF_PORTS) {
      var edge = this.tilespace.coastalEdges[i];
      edge.isPort = true;
      edge.port = portTypes.pop();
      ports++;
    }
  }
};

SixPlayerBoard.prototype.NUMBER_OF_PORTS = 9;
SixPlayerBoard.prototype.TOKEN_ARRANGEMENT = [2, 5, 4, 6, 3, 9, 8, 11, 11, 10, 6, 3, 8, 4, 8, 10, 11, 12, 10, 5, 4, 9, 5, 9, 12, 3, 2, 6];
SixPlayerBoard.prototype.RELATIVE_TILE_ARRANGEMENT = [{"x":-150,"y":-86},{"x":-75,"y":-129},{"x":0,"y":-172},{"x":75,"y":-215},{"x":150,"y":-172},{"x":225,"y":-129},{"x":300,"y":-86},{"x":300,"y":0},{"x":300,"y":86},{"x":225,"y":129},{"x":150,"y":172},{"x":75,"y":215},{"x":0,"y":172},{"x":-75,"y":129},{"x":-150,"y":86},{"x":-150,"y":0},{"x":-75,"y":-43},{"x":0,"y":-86},{"x":75,"y":-129},{"x":150,"y":-86},{"x":225,"y":-43},{"x":225,"y":43},{"x":150,"y":86},{"x":75,"y":129},{"x":0,"y":86},{"x":-75,"y":43},{"x":0,"y":0},{"x":75,"y":-43},{"x":150,"y":0},{"x":75,"y":43}];

