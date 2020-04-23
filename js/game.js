const numDivs = 36;
const maxHits = 10;

let hits = 0;
let error = 0;
let firstHitTime = 0;

function round() {
  $(".target").removeClass("target");
  $(".miss").removeClass("miss");

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  
  // TODO: помечать target текущим номером
  $(divSelector).text(hits + 1);

  if (hits === 1) {firstHitTime = getTimestamp();}
  if (hits === maxHits) {
    $(divSelector).text(1);
    endGame();
  }
}

function endGame() {
  $(".game-field").hide();

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-score").text(hits - error);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  
  if ($(event.target).hasClass("target")) {
    $(event.target).text("");
    hits = hits + 1;
    round();
  }
  else {
    $(event.target).addClass("miss");
    error += 1;  
  }
}

function start() {
  $(".game-field").show();
  $("#button-reload").show();
  $("#button-start").hide();
  if (!$("#win-message").hasClass("d-none")) {
    $("#win-message").addClass("d-none");
  }; 
}

function init() {
  $(".game-field").hide();
  $("#button-reload").hide();
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#button-start").click(start); 

  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    hits = 0;
    error = 0;
    firstHitTime = 0;
    //location.reload();
    start();
  });
}

$(document).ready(init);
