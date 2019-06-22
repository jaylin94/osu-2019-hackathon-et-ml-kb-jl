
// notes:
 // 1 h = 3600000 ms    (60 minutes)
 // 0.5 h = 1800000 ms  (30 minutes)
 // 0.25 h = 900000 ms  (15 minutes)
function timer(addMin) {
 let days, hours, minutes, seconds;
 let endDate;

 clearInterval(interval);

 // converts to milliseconds
 addMin = addMin * 60000;

 // calculates new time (e.g. 60 minutes later)
 endDate = new Date().getTime();
 endDate = new Date(endDate + addMin);

 if (isNaN(endDate)) {
 return;
 }

 var interval = setInterval(calculate, 1000);

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
     return;
   }
 }
}
