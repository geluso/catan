function Trade() {
  this.offering = SHEEP;
  this.receiving = BRICK;

  this.tradeRatio = {};

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
      $(".messages").text("Not enough resources for that trade.");
      return;
    }

    RESOURCES[this.offering.name] -= this.tradeRatio[this.offering.name];
    RESOURCES[this.receiving.name]++;

    updateResources();
    this.updateTradeDisplay();
  }

  this.setOffering = function(resourceName) {
    this.offering = Resources.resourceFromString(resourceName);
    this.updateTradeDisplay();
  };

  this.setReceiving = function(resourceName) {
    this.receiving = Resources.resourceFromString(resourceName);
    this.updateTradeDisplay();
  };

  this.setStartingTradeRatios = function() {
    var that = this;
    _.each(ALL_RESOURCES, function(resource) {
      that.tradeRatio[resource.name] = Trade.STARTING_TRADE_RATIO;
    });
  };

  this.setPortTradeRatio = function() {
    var that = this;
    _.each(ALL_RESOURCES, function(resource) {
      if (that.tradeRatio[resource.name] !== Trade.SPECIFIC_RESOURCE_TRADE_RATIO) {
        that.tradeRatio[resource.name] = Trade.PORT_TRADE_RATIO;
      }
    });
  };

  this.setSpecificResourceTradeRatio = function(resourceName) {
    this.tradeRatio[resourceName] = Trade.SPECIFIC_RESOURCE_TRADE_RATIO;
    updateTradeDisplay();
  };

  this.updateTradeDisplay = function() {
    var that = this;
    _.each($(".trade .offer .resource"), function(element) {
      $(element).text("0");

      if (_.contains(element.classList, that.offering.name)) {
        $(element).text("4");
      }
    });

    _.each($(".trade .receive .resource"), function(element) {
      $(element).text("0");

      if (_.contains(element.classList, that.receiving.name)) {
        $(element).text("1");
      }
    });

    if (RESOURCES[this.offering.name] < this.tradeRatio[this.offering.name]) {
      this.tradeDisabled = true;
    } else {
      this.tradeDisabled = false;
    }

    $("button.trade").attr("disabled", this.tradeDisabled);
  }

  this.setStartingTradeRatios(Trade.STARTING_TRADE_RATIO);
}

Trade.STARTING_TRADE_RATIO = 4;
Trade.PORT_TRADE_RATIO = 3;
Trade.SPECIFIC_RESOURCE_TRADE_RATIO = 2;
