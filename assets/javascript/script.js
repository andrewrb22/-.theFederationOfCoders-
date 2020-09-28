$(document).ready(function () {
  // on click for drop down
  $("#drop").on('click', function (event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    };
  });

  // our api keys
  var apiKey = "344c39f083fc4d8dac4a76e6e15bd196"
  var apiKey2 = "3be041b3f9c84afaa2bb5ee16a7b4c01"
  var apiKey3 = "68373bec57f24a56a3ae46f9079adde1"
  var apiKey4 = "c467d8c1351947afb0b49dc69c417b88"
  // carousel code from materialize
  $('.carousel.carousel-slider').carousel({
    fullWidth: true,
  });

  $(".button").on("click", function () {
    //testing the buttons
    var food = $(this).attr("data-food");
    console.log(food);
    winePairing(food);
    foodRecipe(food);
  });

  // auto play here and its in milliseconds
  $('.carousel').carousel({
  });
  setInterval(function () {
    $('.carousel').carousel('next');
  }, 5000); // every 5 seconds

  // getting video about the recipe
  function recipeVideo(recipe) {
    $.get("https://www.googleapis.com/youtube/v3/search?key=AIzaSyAVRP3mcZrmMjABWbqD-6khzolOQuwuiLk&part=snippet&type=video&maxResults=1&q=" + recipe,
      function (response) {
        console.log(response);
        var videoId = response.items[0].id.videoId;
        $("#video-link").attr("href", "https://www.youtube.com/embed/" + videoId);
      })
  }

  function getIngredients(ID) {
    // clearing the list before anything else
    $("#ingredient-list").empty();
    // retrieving the ingredients of the recipe
    $.ajax({
      url: "https://api.spoonacular.com/recipes/" + ID + "/ingredientWidget.json?apiKey=" + apiKey,
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
      url: "https://api.spoonacular.com/recipes/" + ID + "/information?includeNutrition=false&apiKey=" + apiKey2,
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
      url: "https://api.spoonacular.com/recipes/complexSearch?query=" + food + "&number=50&apiKey=" + apiKey3,
      method: "GET"
    }).then(function (foodInfo) {
      console.log(foodInfo);
      // get a random number
      var numb = randomNumber(50);
      // add recipe title to page
      $(".recipe").text(foodInfo.results[numb].title);
      let recipeId = foodInfo.results[numb].id;
      // getting ingredients of the recipe with its ID
      getIngredients(recipeId);
      // getting link of the recipe with its ID
      recipeLink(recipeId);
      // getting youtube video of the recipe
      recipeVideo(foodInfo.results[numb].title);
    })
  }

  function winePairing(food) {
    // empty div where wine links are going to go
    $("#wine-link").empty();
    // request wine information/ pairing
    $.ajax({
      url: "https://api.spoonacular.com/food/wine/pairing?food=" + food + "&apiKey=" + apiKey4,
      method: "GET"
    }).then(function wine(wineEl) {
      console.log(wineEl);
      // getting the wine selection
      var wineSelection = wineEl.pairedWines;
      // capitalize the first letter of each string in the wine selection
      for (var i = 0; i < wineSelection.length; i++) {
        wineRecommendation(wineSelection[i]);
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

  function wineRecommendation(wine) {
    // request wine recommendation information
    $.ajax({
      url: "https://api.spoonacular.com/food/wine/recommendation?wine=" + wine + "&number=50&apiKey=" + apiKey,
      method: "GET"
    }).then(function (recommendation) {
      console.log(recommendation)
      var wineName = $("<p>");
      var wineLink = $("<a>");
      // get random number
      var numb = randomNumber(recommendation.totalFound)

      console.log(numb)
      // getting the wine recommendations and displaying them on the page with a link where you can buy them
      wineName.text(recommendation.recommendedWines[numb].title + ": " + recommendation.recommendedWines[numb].price + " ");
      wineName.attr("id", "wine-name");
      wineLink.text("Link");
      wineLink.attr("href", recommendation.recommendedWines[numb].link);
      wineLink.attr("target", "_blank");
      $("#wine-link").append(wineName);
      wineName.append(wineLink);
    })
  }
  // capitalizes the first letter of a string
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // gives random number from 0 to given max
  function randomNumber(max) {
    return Math.floor(Math.random() * max);
  }

});
