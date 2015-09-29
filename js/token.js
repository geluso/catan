function Token(value) {
  this.value = value;
}

function TokenGenerator(min, max) {
  this.min = min;
  this.max = max;

  this.randomToken = function() {
    var range = this.max - this.min - 1;

    var value = this.min + Math.round(range * Math.random());

    // bump sevens up
    if (value > 6) {
      value++
    }

    var token = new Token(value);
    return token;
  };
}

