var recipeDir = [];
var recipeDesc = {};
var time;
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDK_8HWkEyCsHwafNFmf2F4OSfo7IzlRec",
  authDomain: "hackathon-2019-out-of-thyme.firebaseapp.com",
  databaseURL: "https://hackathon-2019-out-of-thyme.firebaseio.com",
  projectId: "hackathon-2019-out-of-thyme",
  storageBucket: "hackathon-2019-out-of-thyme.appspot.com",
  messagingSenderId: "217558856346",
  appId: "1:217558856346:web:0858f91b1d02c9a4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
//for text to speech functionality
var synth = window.speechSynthesis;

$(function() {
// When form button is clicked, recipeDisplay is run and the text of the recipe description and recipe directions are changed.
  Timer.init();
  $("#formSubmitBtn").on("click", function(e){
    e.preventDefault();
    var recipeSelected = $( "#recipeSelect" ).val();
    $("#startCookingBtn").css('display','block');
    getSteps(recipeSelected);
    setTimeout(recipeDisplay, 700);
    setTimeout(trackRecipeProgression, 700);
  });
});

// Display's recipe selected from dropdown, only recipe1 generates info currently
function recipeDisplay(){
  $("#recipeDescription").text(recipeDesc.description);
  $("#recipeDirections").empty();
  $("#recipeIngredients").text(recipeDesc.ingredients);
  $("#recipeSource").text(recipeDesc.url);
  // list each recipe step w/checkbox
  $(recipeDir).each(function(i) {
    var newListItem = document.createElement('li');
    var newInput = document.createElement('input');
    var label = document.createElement('label');

    newInput.type="checkbox";
    label.appendChild(newInput);
    label.appendChild(document.createTextNode(this.direction));
    $(newListItem).append(label);
    $("#recipeDirections").append(newListItem);
  });
}
$("#startCookingBtn").on("click", function(e){
  e.preventDefault();
  var listItems = $("#recipeDirections li input");
  var currentStep = 0;


    time = recipeDir[0].time;
  //read the next direction to user
    var speech = recipeDir[0].direction;
    var utterThis = new SpeechSynthesisUtterance(speech);
    utterThis.lang = 'en-GB';
    synth.speak(utterThis);

    if (time) {
      functionAlert();
    }
  });

function trackRecipeProgression() {
  // track current recipe step of user
  var listItems = $("#recipeDirections li input");
  var currentStep = 0;

  // update current step when input box is checked
  listItems.on("change", function(e) {
    $(this).prop('disabled', true);
    currentStep = listItems.index(this) + 1;

    time = recipeDir[currentStep].time;
  //read the next direction to user
    var speech = recipeDir[currentStep].direction;
    var utterThis = new SpeechSynthesisUtterance(speech);
    utterThis.lang = 'en-GB';
    synth.speak(utterThis);

    if (time) {
      functionAlert();
    }
  });
}

function getSteps(recipeId){
  //get the recipe info, including the description
  var recipeQuery = db.collection('recipes').where('id', '==', recipeId);
  recipeQuery.get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      recipeDesc=doc.data();
    });
  });
//get each recipe direction one by one, and push to recipeDir array from firestore db
  recipeDir = [];
  var dirQuery = db.collection('directions').where('id', '==', recipeId).orderBy('stepNum','asc');
  dirQuery.get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      recipeDir.push(doc.data());
    });
  });
};

function functionAlert() {
  var confirmBox = $('#confirm');
  confirmBox.show();

  $('#confirm-timer').on("click", function(e) {
    e.preventDefault();
    confirmBox.hide();
    Timer.startTimer(time, true);
  });

  $('#reject-timer').on("click", function(e) {
    e.preventDefault();
    confirmBox.hide();
  });
}


//Hides initial page and landing page
$(".fade-out").css("opacity", 0);
$(".landing-page").css("opacity", 0);
$("body").css("background", "white");

//Animates landing page and navbar as page is loaded
$(".landing-page").animate({opacity: 1}, 2000);
$(".navbar-top").animate({opacity: 1}, 2000);

//Enter button functionality, animates landing page, main page
$("#enterBtn").on("click", function(){
  $(".landing-page").animate({opacity: 0}, 1000);
  $(".fade-out").animate({opacity: 1}, 2000);
  $(".landing-page").fadeOut();
});
