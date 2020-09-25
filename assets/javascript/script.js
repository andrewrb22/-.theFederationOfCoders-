// carousel code from materialize
$('.carousel.carousel-slider').carousel({
  fullWidth: true,
  indicators: true
});

$(".btn").on("click", function () {
  //testing the buttons
  var food = $(this).attr("data-food");
  console.log(food);
  winePairing(food);
  foodRecipe(food);
})


//auto play here and its in millaseconds
$('.carousel').carousel();
setInterval(function () {
  $('.carousel').carousel('next');
}, 5000); // every 5 seconds


function foodRecipe(food) {
  $.ajax({
    url: "https://api.spoonacular.com/recipes/complexSearch?query=" + food + "&apiKey=344c39f083fc4d8dac4a76e6e15bd196",
    method: "GET"
  })

    .then(function (foodInfo) {
      console.log(foodInfo);
      $(".recipe").text(foodInfo.results[0].title);
      $(".cardImage").attr("src",foodInfo.results[0].image)
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
    for(var i = 0; i < wineSelection.length; i++) {
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

function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function randomnumber() {
  return Math.floor((Math.random() * 100) + 1);
}

console.log(randomnumber());
