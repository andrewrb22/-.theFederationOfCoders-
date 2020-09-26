$(document).ready(function () {
  // our api key
  var apiKey = "344c39f083fc4d8dac4a76e6e15bd196"
  var apiKey2 = "3be041b3f9c84afaa2bb5ee16a7b4c01"
  var apiKey3 = "68373bec57f24a56a3ae46f9079adde1"
  var apiKey4 = "c467d8c1351947afb0b49dc69c417b88"
  // carousel code from materialize
  $('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
  });

  $(".button").on("click", function () {
    //testing the buttons
    var food = $(this).attr("data-food");
    console.log(food);
    winePairing(food);
    foodRecipe(food);
    // wineRecommendation();
  });


  //auto play here and its in millaseconds
  $('.carousel').carousel();
  setInterval(function () {
    $('.carousel').carousel('next');
  }, 5000); // every 5 seconds

  function getIngredients(ID) {
    // retrieving the ingredients of the recipe
    $.ajax({
      url: "https://api.spoonacular.com/recipes/" + ID + "/ingredientWidget.json?apiKey=" + apiKey4,
      method: "GET"
    }).then(function foodSummary(response) {
      console.log(response)
      // get the array of the ingredients 
      var ingredientsArr = response.ingredients;
      // traverse the ingredients array
      for (var i = 0; i < ingredientsArr.length; i++) {
        // create li to put the ingredients in it
        var liEl = $("<li>");
        liEl.text((i + 1) + ". " + ingredientsArr[i].name);
        // put each ingredient on the page
        $("#ingredient-list").append(liEl);
      }

    });
  };

  function recipeLink(ID) {
    // getting the recipe link
    $.ajax({
      url: "https://api.spoonacular.com/recipes/" + ID + "/information?includeNutrition=false&apiKey=" + apiKey,
      method: "GET"
    }).then(function (link) {
      console.log(link);
      // adding the link of the recipe to the "Here!" label of the recipe card
      $("#recipe-link").attr("href", link.sourceUrl);
    })
  }


  function foodRecipe(food) {
    // getting recipe info
    $.ajax({
      url: "https://api.spoonacular.com/recipes/complexSearch?query=" + food + "&apiKey=" + apiKey,
      method: "GET"
    }).then(function (foodInfo) {
      console.log(foodInfo);
      // add recipe title to page
      $(".recipe").text(foodInfo.results[0].title);
      // getting ID of recipe
      let recipeId = foodInfo.results[0].id;
      // getting ingredients of the recipe with the ID
      getIngredients(recipeId);
      recipeLink(recipeId);
    })
  }

  function winePairing(food) {
    // request wine information/ pairing
    $.ajax({
      url: "https://api.spoonacular.com/food/wine/pairing?food=" + food + "&apiKey=" + apiKey2,
      method: "GET"
    }).then(function wine(wineEl) {
      console.log(wineEl);
      // getting the wine selection
      var wineSelection = wineEl.pairedWines;
      // capitalize the first letter of each string in the wine selection
      for (var i = 0; i < wineSelection.length; i++) {
        wineSelection[i] = capitalize(wineSelection[i]);
      }
      // making array a string with the elements separated by commas
      var wineString = wineSelection.join(", ");
      // adding selection to page
      $(".winetitle").text(wineString);
      // adding wine description to page
      $("#wine-info-p").text(wineEl.pairingText);
      // getting recommendations depending of the paired wines

    });
  }

  function wineRecommendation() {
    var queryURL = "https://api.spoonacular.com/food/wine/recommendation?wine=&number=2&apiKey=" + apiKey3;
    // request wine recommendation information
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (recommendation) {
      console.log(recommendation)

    });
  }

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  function randomnumber() {
    return Math.floor((Math.random() * 100) + 1);
  }

  console.log(randomnumber());

});