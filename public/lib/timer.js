// notes:
 // 1 h = 3600000 ms    (60 minutes)
 // 0.5 h = 1800000 ms  (30 minutes)
 // 0.25 h = 900000 ms  (15 minutes)

var Timer = {
  currentTimeRemaining:0,
  pauseTime:0,
  timerInterval: null,
  minutes: 0,
  endDate: null,
  resetButton: function() {
    $('#timerResetBtn').on("click", function(e) {
      e.preventDefault();
      $('#timerStartBtn').attr('disabled', true);
      this.reset();
    }.bind(this));
  },
  pauseButton: function() {
    $('#timerPause').on('click', function(e) {
      e.preventDefault();
      $('#timerPause').attr('disabled', true);
      $('#timerStartBtn').attr('disabled', false);
      clearInterval(this.timerInterval);
      pauseTime=currentTimeRemaining;
    }.bind(this));
  },
  startButton: function() {
    $('#timerStartBtn').on('click', function(e) {
      e.preventDefault();
      $('#timerPause').attr('disabled', false);
      $('#timerResetBtn').attr('disabled', false);
      //this.timerInterval = setInterval(this.calculate, 1000);
      Timer.startTimer(pauseTime/60, true);
    }.bind(this));
  },
  stopTimer: function() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  },
  startTimer: function(addMin) {
     let days, hours, minutes, seconds;

     if (this.timerInterval) { clearInterval(this.timerInterval); }

     this.minutes = addMin;
     this.minutesRemaining = addMin;

     $('#timerResetBtn').attr('disabled', false);
     $('#timerPause').attr('disabled', false);

     // converts to milliseconds
     addMin = addMin * 60000;

     // calculates new time (e.g. 60 minutes later)
     Timer.endDate = new Date().getTime();
     Timer.endDate = new Date(this.endDate + addMin);

     if (isNaN(this.endDate)) {
       return;
     }

     this.timerInterval = setInterval(this.calculate, 1000);
  },
  calculate: function() {
    // gets current time
    let startDate = new Date();
    startDate = startDate.getTime();

    // get time in seconds
    let timeRemaining = parseInt((Timer.endDate - startDate) / 1000);

    // calculates time in hours, minutes, and seconds
    if (timeRemaining >= 0) {
      currentTimeRemaining=timeRemaining;
      hours = parseInt(timeRemaining / 3600);
      timeRemaining = (timeRemaining % 3600);

      minutes = parseInt(timeRemaining / 60);
      timeRemaining = (timeRemaining % 60);

      seconds = parseInt(timeRemaining);

      // __ Hour(s) __Minutes(s) __Seconds(s)
      document.getElementById("hours").innerHTML = ("0" + hours).slice(-2);
      document.getElementById("minutes").innerHTML = ("0" + minutes).slice(-2);
      document.getElementById("seconds").innerHTML = ("0" + seconds).slice(-2);
    } else {
      $('#audio')[0].play();
      setTimeout(function() {
        $('#audio')[0].pause();
      }, 3000);
      clearInterval(this.timerInterval)
      this.minutes = 0;
      return;
    }
  },
  reset: function() {
    this.stopTimer();
    $('#hours').text('00');
    $('#minutes').text('00');
    $('#seconds').text('00');

    if (this.minutes) {
      this.startTimer(this.minutes);
    }
  },
  bind: function() {
    this.startButton();
    this.pauseButton();
    this.resetButton();
  },
  init: function() {
    this.reset();
    this.bind();
  },
};
