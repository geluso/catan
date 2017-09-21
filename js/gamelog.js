function GameLog(msg, player) {
  HideBanner();

  var log = document.getElementById("gamelog");

  var colorBlock = document.createElement("div");
  colorBlock.className = "player";
  colorBlock.style.backgroundColor = "gray";

  // color the block if the message pertains to a player
  if (player) {
    colorBlock.style.backgroundColor = player;
  }

  var message = document.createElement("div");
  message.className = "message";
  message.textContent = msg;
  
  var entry = document.createElement("div");
  entry.appendChild(colorBlock);
  entry.appendChild(message);

  log.appendChild(entry);

  log.scrollTop = Number.MAX_SAFE_INTEGER;
}

function HideBanner() {
  $(".info.top").hide();
}

function Banner(msg, player, forceShow) {
  if (!forceShow && player && player !== "red") {
    return;
  }

  $(".messages").text(msg);

  if (!player) {
    player = "red";
  }

  var colorBlock = $(".info.top .player");
  colorBlock.css({backgroundColor: player});

  $(".info.top").show();
}
