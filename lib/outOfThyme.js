document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
  document.getElentById("getRecipe").addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    var route=[need to add this later]+"?recipe=";
    var recipe=getElemnetById('recipeSelect').value;
    req.open('GET', route+recipe, true);
    req.addEventListener('load', function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);
      console.log(response);
      var response = JSON.parse(req.responseText);
      } else {
        console.log("Error in network request: " + req.statusText);
      }});
      req.send(route+recipe);
      event.preventDefault();
  });
}
var testRecipe = [
  {
    name: "It'sa Spicy Meatball",
    description: "My great-grandmother started this easy meatball recipe with our family. We use ground beef and turkey for these meatballs, and the flavor’s so good, you won’t miss the extra calories. —Audrey Colantino, Winchester, Massachusetts",
    ingredients: "2 teaspoons olive oil 1 medium onion, chopped 3 garlic cloves, minced 3/4 cup seasoned bread crumbs 1/2 cup grated Parmesan cheese 2 large eggs, lightly beaten 1 teaspoon each dried basil, oregano and parsley flakes 3/4 teaspoon salt 1 pound lean ground turkey 1 pound lean ground beef (90% lean) Optional: Hot cooked pasta and pasta sauce",
    directions: "Preheat oven to 375°. In a small skillet, heat oil over medium-high heat. Add onion; cook and stir until tender, 3-4 minutes. Add garlic; cook 1 minute longer. Cool slightly. In a large bowl, combine bread crumbs, cheese, eggs, seasonings and onion mixture. Add turkey and beef; mix lightly but thoroughly. Shape into 1-1/2-in. balls. Place meatballs on a rack coated with cooking spray in a 15x10x1-in. baking pan. Bake until lightly browned and cooked through, 18-22 minutes. If desired, serve with pasta and pasta sauce.",
    tips: "Test Kitchen Tips Consider preparing meatballs in bulk to save on prep time. You can make several batches of meatballs, bake them and then freeze until needed. Simply thaw the frozen meatballs in the refrigerator overnight and you’ll be ready to go. Spaghetti-and-meatball pizza is a fun way to combine two Italian-inspired favorites. If you have leftover cooked spaghetti, toss it with some spaghetti sauce or additional pizza sauce, then layer it on the pizza before the onion and meatballs. Buon appetito! Check out 37 of our favorite meatball recipes.",
    nutFacts: "Nutrition Facts 1 serving: 271 calories, 13g fat (5g saturated fat), 125mg cholesterol, 569mg sodium, 10g carbohydrate (1g sugars, 1g fiber), 27g protein. Diabetic Exchanges: 4 lean meat, 1 fat, 1/2 starch.",
    review: "Madison May 30, 2019 This is by far the best recipe me and my sister have ever had. The turkey is not needed and you can substitute it our for more BEEF. The olive oil really adds to the flavor of the onions and makes them caramelized. We enjoyed this recipe and so did everyone I highly recommend it and to just substitute out the ground turkey.",
    url: "https://www.tasteofhome.com/recipes/great-grandma-s-italian-meatballs/"
  }
]



