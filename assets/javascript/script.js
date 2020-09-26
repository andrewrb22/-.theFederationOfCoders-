$(document).ready(function () {
  // adding scroll down button
  $("a").on('click', function(event) {

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
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

  // our api key
  var apiKey = "344c39f083fc4d8dac4a76e6e15bd196"
  var apiKey2 = "3be041b3f9c84afaa2bb5ee16a7b4c01"
  var apiKey3 = "68373bec57f24a56a3ae46f9079adde1"
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
    wineRecommendation();
  });


  //auto play here and its in millaseconds
  $('.carousel').carousel();
  setInterval(function () {
    $('.carousel').carousel('next');
  }, 5000); // every 5 seconds

  function summaryId(summary) {

    $.ajax({

      url: "https://api.spoonacular.com/recipes/" + summary + "/summary?apiKey=" + apiKey2,
      method: "GET"

    }).then(function foodSummary(response) {
      console.log(response)

    });
  };


  function foodRecipe(food) {
    $.ajax({
      url: "https://api.spoonacular.com/recipes/complexSearch?query=" + food + "&apiKey=" + apiKey,
      method: "GET"
    }).then(function (foodInfo) {
        console.log(foodInfo);
        $(".recipe").text(foodInfo.results[0].title);
        $(".cardImage").attr("src", foodInfo.results[0].image)

        console.log(foodInfo.results[0].id);
        let summary = foodInfo.results[0].id;
        summaryId(summary);

      })
  }

  function winePairing(food) {

    // request wine information/ steak pairing
    $.ajax({
      url: "https://api.spoonacular.com/food/wine/pairing?food=" + food + "&apiKey=3be041b3f9c84afaa2bb5ee16a7b4c01",
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
    });
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
    var queryURL = "https://api.spoonacular.com/food/wine/recommendation?wine=merlot&number=2&apiKey=" + apiKey3;
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

})