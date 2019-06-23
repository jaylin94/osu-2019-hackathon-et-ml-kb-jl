// notes:
 // 1 h = 3600000 ms    (60 minutes)
 // 0.5 h = 1800000 ms  (30 minutes)
 // 0.25 h = 900000 ms  (15 minutes)

var Timer = {
  timerInterval: null,
  minutes: 0,
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
    }.bind(this));
  },
  startButton: function() {
    $('#timerStartBtn').on('click', function(e) {
      e.preventDefault();
      $('#timerPause').attr('disabled', false);
      $('#timerResetBtn').attr('disabled', false);
    }.bind(this));
  },
  stopTimer: function() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  },
  startTimer: function(addMin) {
     let days, hours, minutes, seconds;
     let endDate;

     this.minutes = addMin;

     $('#timerResetBtn').attr('disabled', false);
     $('#timerPause').attr('disabled', false);

     // converts to milliseconds
     addMin = addMin * 60000;

     // calculates new time (e.g. 60 minutes later)
     endDate = new Date().getTime();
     endDate = new Date(endDate + addMin);

     if (isNaN(endDate)) {
       return;
     }

     this.timerInterval = setInterval(calculate, 1000);

     function calculate() {
       // gets current time
       let startDate = new Date();
       startDate = startDate.getTime();

       // get time in seconds
       let timeRemaining = parseInt((endDate - startDate) / 1000);

       // calculates time in hours, minutes, and seconds
       if (timeRemaining >= 0) {
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
         clearInterval(this.timerInterval)
         this.minutes = 0;
         return;
       }
     }
  },
  reset: function() {
    this.stopTimer();
    $('#hours').text('00');
    $('#minutes').text('00');
    $('#seconds').text('00');

    if (this.minutes) {
      console.log('hello');
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
