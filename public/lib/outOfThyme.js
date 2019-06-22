var testRecipe = [
  {
    name: "It'sa Spicy Meatball",
    description: "My great-grandmother started this easy meatball recipe with our family. We use ground beef and turkey for these meatballs, and the flavor’s so good, you won’t miss the extra calories. —Audrey Colantino, Winchester, Massachusetts",
    ingredients: "2 teaspoons olive oil 1 medium onion, chopped 3 garlic cloves, minced 3/4 cup seasoned bread crumbs 1/2 cup grated Parmesan cheese 2 large eggs, lightly beaten 1 teaspoon each dried basil, oregano and parsley flakes 3/4 teaspoon salt 1 pound lean ground turkey 1 pound lean ground beef (90% lean) Optional: Hot cooked pasta and pasta sauce",
    directions: [{step: "Preheat oven to 375°.", time: null},
      {step: "In a small skillet, heat oil over medium-high heat.", time: null},
      {step: "Add onion", time: null},
      {step: "cook and stir until tender (3-4 minutes).", time: 4},
      {step: "Add garlic; cook 1 minute longer", time: 1},
      {step: "Cool slightly.", time: null},
      {step: "In a large bowl, combine bread crumbs, cheese, eggs, seasonings and onion mixture.", time: null},
      {step: "Add turkey and beef; mix lightly but thoroughly.", time: null},
      {step: "Shape into 1-1/2-in. balls. Place meatballs on a rack coated with cooking spray in a 15x10x1-in. baking pan.", time: null},
      {step: "Bake until lightly browned and cooked through. 18-22 minutes.", time: 20},
      {step: "If desired, serve with pasta and pasta sauce.", time: null}],
    tips: "Test Kitchen Tips Consider preparing meatballs in bulk to save on prep time. You can make several batches of meatballs, bake them and then freeze until needed. Simply thaw the frozen meatballs in the refrigerator overnight and you’ll be ready to go. Spaghetti-and-meatball pizza is a fun way to combine two Italian-inspired favorites. If you have leftover cooked spaghetti, toss it with some spaghetti sauce or additional pizza sauce, then layer it on the pizza before the onion and meatballs. Buon appetito! Check out 37 of our favorite meatball recipes.",
    nutFacts: "Nutrition Facts 1 serving: 271 calories, 13g fat (5g saturated fat), 125mg cholesterol, 569mg sodium, 10g carbohydrate (1g sugars, 1g fiber), 27g protein. Diabetic Exchanges: 4 lean meat, 1 fat, 1/2 starch.",
    review: "Madison May 30, 2019 This is by far the best recipe me and my sister have ever had. The turkey is not needed and you can substitute it our for more BEEF. The olive oil really adds to the flavor of the onions and makes them caramelized. We enjoyed this recipe and so did everyone I highly recommend it and to just substitute out the ground turkey.",
    url: "https://www.tasteofhome.com/recipes/great-grandma-s-italian-meatballs/",
    timers: "Placeholder for timers"
  }
];
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

$(function() {
// When form button is clicked, recipeDisplay is run and the text of the recipe description and recipe directions are changed.
  $("#formSubmitBtn").on("click", function(e){
    e.preventDefault();
    recipeDisplay();

    //databaseRetrieve();
    getSteps("recipe1");
    trackRecipeProgression();
    });
  //reference: https://www.youtube.com/watch?v=NcewaPfFR6Y
  /*function databaseRetrieve(){
    db.collection("recipes").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
      });
    });
  }*/

});

// Display's recipe selected from dropdown, only recipe1 generates info currently
function recipeDisplay(){
  if($("#recipeSelect").val() === "recipe1"){
    $("#recipeDescription").text(testRecipe[0].description);

    // list each recipe step w/checkbox
    $(testRecipe[0]['directions']).each(function(i) {
      var newListItem = document.createElement('li');
      var newInput = document.createElement('input');
      var label = document.createElement('label');

      newInput.type="checkbox";
      label.appendChild(newInput);
      label.appendChild(document.createTextNode(this.step));
      $(newListItem).append(label);
      $("#recipeDirections").append(newListItem);
    });
  }
  else {
    $("#recipeDescription").text("N/A");
    $("#recipeDirections").text("N/A");
  }
}

// Display's recipe selected from dropdown, only recipe1 generates info currently
function recipeDisplay(){
  if($("#recipeSelect").val() === "recipe1"){
    $("#recipeDescription").text(testRecipe[0].description);

    // list each recipe step w/checkbox
    $(testRecipe[0]['directions']).each(function(i) {
      var newListItem = document.createElement('li');
      var newInput = document.createElement('input');
      var label = document.createElement('label');

      newInput.type="checkbox";
      label.appendChild(newInput);
      label.appendChild(document.createTextNode(this.step));
      $(newListItem).append(label);
      $("#recipeDirections").append(newListItem);
    });
  }
  else {
    $("#recipeDescription").text("N/A");
    $("#recipeDirections").text("N/A");
  }
}

function trackRecipeProgression() {
  // track current recipe step of user
  var listItems = $("#recipeDirections li input");
  var currentStep = 0;

  // update current step when input box is checked
  listItems.on("change", function(e) {
    $(this).prop('disabled', true);
    currentStep = listItems.index(this) + 1;

    var time = testRecipe[0]['directions'][currentStep].time;

    if (time) {
      if (confirm('Begin timer?')) {
        timer(time);
      }
    }
  });
}

function getSteps(recipeId){
  //get the recipe info, including the description
  var recipeQuery=db.collection('recipes').where('id', '==', recipeId);
  recipeQuery.get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
      console.log(doc.data());
    })
  })
//get each recipe direction one by one, from firestore db
  var dirQuery=db.collection('directions').where('id', '==', recipeId).orderBy('stepNum','asc');
  dirQuery.get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
      console.log(doc.data());
    })
  });

};
