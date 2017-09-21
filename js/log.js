var LOG_BUILDS = true;
var LOG_TRADING = true;

var LOG_TURNS = true;
var LOG_EMPTY_TURNS = false;

var LOG_ROBBER = true;

var LOG = false;
var LOG_INDENT = 0;

function Log() {
  var prefix = "";
  if (LOG_INDENT > 0) {
    for (var i = 0; i < LOG_INDENT; i++) {
      prefix += "  ";
    }
  }

  if (LOG) {
    if (prefix) {
      console.log(prefix, arguments);
    } else {
      console.log(arguments);
    }
  }
}
