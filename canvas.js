var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var rocket = new Image();
var BackgroundCanvas;
var RocketCanvas;
var TimeCanvas;
var c1;
var c2;
var c3;
var date = new Date('January 1, 1970 00:12:30');

function drawBackground() {
  var gradient=c1.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0,"purple");
  gradient.addColorStop(1,"red");
  c1.fillStyle=gradient;
  c1.fillRect(0,0,canvas.width,canvas.height);
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

function drawRocket() {
  rocket.onload = function() {
    c2.drawImage(rocket, 0, (window.innerHeight * ((date.getMinutes()+date.getSeconds()/60)/27)));
  }
  rocket.src = "./rocket.png";
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
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
      console.log(date.getSeconds());
      c2.clearRect(0, 0, canvas.width, canvas.height);
      c3.clearRect(0, 0, canvas.width, canvas.height);
      drawClock(date);
      drawRocket();
    }
  }
}


function init() {
  BackgroundCanvas = document.getElementById("BackgroundCanvas");
  c1 = BackgroundCanvas.getContext("2d");
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
