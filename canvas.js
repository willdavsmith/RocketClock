let RocketCanvas = document.getElementById("RocketCanvas");
let c2 = RocketCanvas.getContext("2d");
c2.canvas.width = 30;
c2.canvas.height = innerHeight;
let TimeCanvas = document.getElementById("TimeCanvas");
let c3 = TimeCanvas.getContext("2d");
c3.canvas.width = 900;
c3.canvas.height = 300;
let rocket = new Image();
rocket.src = "./rocket.png";
let paused = false;
let time = new Time(25, 0);

function Time(minutes, seconds){
  this._seconds = seconds;
  this._minutes = minutes;

  this.getSeconds = function() {
    return this._seconds;
  };
  this.getMinutes = function() {
    return this._minutes;
  };
  this.setSeconds = function(newS) {
    this._seconds = newS;
  };
  this.setMinutes = function(newM) {
    this._minutes = newM;
  };

  this.decrementClock = function() {
    if (this._seconds !== 0) {
      this._seconds--;
    }
    else if (this._seconds === 0 && this._minutes !== 0) {
      this._minutes--;
      this._seconds = 59;
    }
    else {
      console.log('DONE');
    }
  };

  // Determines if the time should be represented with a preceding 0 or not. e.g. 9 => 09 and 10 => 10
  this.toOutput = function() {
    let s, m;
    if (this._seconds/10 < 1) {s = "0" + this._seconds;}
    else {s = this._seconds;}
    if (this._minutes/10 < 1) {m = "0" + this._minutes;}
    else {m = this._minutes;}

    // returns the time as a String in the form "00 00"
    return `${m} ${s}`;
  };
}

function drawClock(time) {
  c3.font = "300px IBM Plex Mono";
  c3.fillStyle = "white";
  c3.fillText(time.toOutput(), 0, 250);
}

function resetClock() {
  time.setSeconds(0);
  time.setMinutes(25);
}

function pauseClock() {
  paused = !paused;
  let pausedSeconds = time.getSeconds() + 1;
  let pausedMinutes = time.getMinutes();
  checkPaused();
  function checkPaused() {
    if (paused) {
      time.setSeconds(pausedSeconds);
      time.setMinutes(pausedMinutes);
      window.setTimeout(checkPaused, 100);
    }
    else {
      pausedSeconds = null;
      pausedMinutes = null;
      // document.getElementById("Pause"). = "Start"
    }
  }
}

function drawRocket() {
  c2.clearRect(0, 0, c2.canvas.width, c2.canvas.height);
  let rocketX = 0;
  let rocketY = window.innerHeight * ((time.getMinutes()+time.getSeconds()/60)/27);
  c2.drawImage(rocket, rocketX, rocketY);
}

function runClock() {
  time.decrementClock();
  c3.clearRect(0, 0, c3.canvas.width, c3.canvas.height);
  drawClock(time);
  drawRocket();
}

drawRocket();
drawClock(time);
setInterval(runClock, 1000);
