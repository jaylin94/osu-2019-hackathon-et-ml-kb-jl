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
