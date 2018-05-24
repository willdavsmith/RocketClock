var canvas = document.getElementById("canvas");
var rocket = new Image();
var BackgroundCanvas;
var RocketCanvas;
var TimeCanvas;
var c1;
var c2;
var c3;
var date = new Date('January 1, 1970 00:12:30');
var paused = false;

function drawBackground() {
  var gradient = c1.createLinearGradient(0, 0, innerWidth, innerHeight);
  gradient.addColorStop(0,"purple");
  gradient.addColorStop(1,"red");
  c1.fillStyle = gradient;
  c1.fillRect(0,0,innerWidth,innerHeight);
}

function drawClock(time) {
  if (time.getSeconds() / 10 < 1) {
    seconds = "0" + time.getSeconds().toString();
  }
  else {
    seconds = time.getSeconds().toString();
  }
  if (time.getMinutes() / 10 < 1) {
    minutes = "0" + time.getMinutes().toString();
  }
  else {
    minutes = time.getMinutes().toString();
  }

  time = minutes + " " + seconds;
  c3.font = "300px Courier New";
  c3.fillStyle = "white";
  c3.textAlign = "center";
  c3.fillText(time, 720, 200);
}

function resetClock() {
  date.setSeconds(0);
  date.setMinutes(25);
}
function pauseClock() {
  paused = !paused;
  var pausedSeconds = date.getSeconds() + 1;
  var pausedMinutes = date.getMinutes();
  console.log(pausedSeconds);
  checkPaused();
  function checkPaused() {
    if (paused == true) {
      date.setSeconds(pausedSeconds);
      date.setMinutes(pausedMinutes);
      window.setTimeout(checkPaused, 1000);
    }
  }
}

function drawRocket() {
  rocket.onload = function() {
    c2.drawImage(rocket, 0, (window.innerHeight * ((date.getMinutes()+date.getSeconds()/60)/27)));
  }
  rocket.src = "./rocket.png";
}

function resize() {
  c1.canvas.width = innerWidth;
  c1.canvas.height = innerHeight;
  drawBackground();
  drawRocket();
  drawClock(date);
}


function runClock() {
  var countdownInterval = setInterval(countdown, 1000);
  function countdown() {
    if (date.getMinutes() == 0 && date.getSeconds() == 0) {
      clearInterval(countdownInterval);
    }
    else {
      date.setSeconds(date.getSeconds() - 1);
      c2.clearRect(0, 0, innerWidth, innerHeight);
      c3.clearRect(0, 0, innerWidth, innerHeight);
      drawClock(date);
      drawRocket();
    }
  }
}

function init() {
  BackgroundCanvas = document.getElementById("BackgroundCanvas");
  c1 = BackgroundCanvas.getContext("2d");
  c1.canvas.width = innerWidth;
  c1.canvas.height = innerHeight;
  RocketCanvas = document.getElementById("RocketCanvas");
  c2 = RocketCanvas.getContext("2d");
  TimeCanvas = document.getElementById("TimeCanvas");
  c3 = TimeCanvas.getContext("2d");
  c2.canvas.width = 100;
  c2.canvas.height = window.innerHeight;
  c3.canvas.width = window.innerWidth;
  c3.canvas.height = 210;

  drawBackground();
  drawRocket();
  drawClock(date);
  runClock();

  addEventListener('resize', resize, false);
}
init();
