function Trade(game) {
  this.game = game;
  this.offering = SHEEP;
  this.receiving = BRICK;

  this.tradeRatio = {};
  _.each(this.game.players, function(player) {
    this.tradeRatio[player] = {};
  }, this);

  var that = this;
  $(".trade .offer .resource").click(function(e) {
    var resourceName = e.target.classList[1];
    that.setOffering(resourceName);
  })

  $(".trade .receive .resource").click(function(e) {
    var resourceName = e.target.classList[1];
    that.setReceiving(resourceName);
  })

  $("button.trade").click(function() {
    that.trade();
  });

  this.trade = function() {
    if (this.tradeDisabled) {
      Banner("Not enough resources for that trade.");
      return;
    }

    this.bankTrade(MAIN_PLAYER, this.offering, this.receiving);
  }

  this.bankTrade = function(player, offering, receiving) {
    if (LOG_TRADING) {
      console.log(player, "trades", offering.name, "for", receiving.name);
    }

    RESOURCES[player][offering.name] -= this.tradeRatio[player][offering.name];
    RESOURCES[player][receiving.name]++;

    updateResources();
    this.update();
  }

  this.setOffering = function(resourceName) {
    this.offering = Resources.resourceFromString(resourceName);
    this.update();
  };

  this.setReceiving = function(resourceName) {
    this.receiving = Resources.resourceFromString(resourceName);
    this.update();
  };

  this.setStartingTradeRatios = function() {
    var that = this;
    _.each(this.game.players, function(player) {
      _.each(ALL_RESOURCES, function(resource) {
        that.tradeRatio[player][resource.name] = Trade.STARTING_TRADE_RATIO;
      });
    });
  };

  this.setPortTradeRatio = function(player) {
    var that = this;
    _.each(ALL_RESOURCES, function(resource) {
      if (that.tradeRatio[player][resource.name] !== Trade.SPECIFIC_RESOURCE_TRADE_RATIO) {
        that.tradeRatio[player][resource.name] = Trade.PORT_TRADE_RATIO;
      }
    });
  };

  this.setSpecificResourceTradeRatio = function(resourceName, player) {
    this.tradeRatio[player][resourceName] = Trade.SPECIFIC_RESOURCE_TRADE_RATIO;
    this.update();
  };

  this.update = function() {
    var that = this;
    _.each($(".trade .offer .resource"), function(element) {
      $(element).text("0");

      if (_.contains(element.classList, that.offering.name)) {
        var value = this.tradeRatio[MAIN_PLAYER][that.offering.name];
        $(element).text(value);
      }
    }, this);

    _.each($(".trade .receive .resource"), function(element) {
      $(element).text("0");

      if (_.contains(element.classList, that.receiving.name)) {
        $(element).text("1");
      }
    });

    if (RESOURCES[MAIN_PLAYER][this.offering.name] < this.tradeRatio[MAIN_PLAYER][this.offering.name]) {
      this.tradeDisabled = true;
    } else {
      this.tradeDisabled = false;
    }

    $("button.trade").attr("disabled", this.tradeDisabled);
  }

  this.setStartingTradeRatios(Trade.STARTING_TRADE_RATIO);

  this.canTrade = function(color) {
    var canTrade = false;
    _.each(ALL_RESOURCES, function(resource) {
      if (RESOURCES[color][resource.name] >= Trade.STARTING_TRADE_RATIO) {
        canTrade = true;
      }
    });

    return canTrade;
  }

  this.showAllPlayerTradeRatios = function() {
    var that = this;

    _.each(this.game.players, function(player) {
      var ability = "";

      _.each(ALL_RESOURCES, function(resource) {
        var ratio = that.tradeRatio[player][resource.name];
        ability += resource.name + "(" + ratio + ") ";
      });

      console.log(player, ability);
    });
  };
}

Trade.STARTING_TRADE_RATIO = 4;
Trade.PORT_TRADE_RATIO = 3;
Trade.SPECIFIC_RESOURCE_TRADE_RATIO = 2;
