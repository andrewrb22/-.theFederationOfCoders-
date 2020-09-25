// carousel code from materialize
$(".carousel.carousel-slider").carousel({
  fullWidth: true,
  indicators: true,
});

$(".btn").on("click", function () {
  //testing the buttons
  var food = $(this).attr("data-food");
  console.log(food);
  winePairing(food);
  foodRecipe(food);
});

//auto play here and its in millaseconds
$(".carousel").carousel();
setInterval(function () {
  $(".carousel").carousel("next");
}, 5000); // every 5 seconds

function foodRecipe(food) {
  $.ajax({
    url:
      "https://api.spoonacular.com/recipes/complexSearch?query=" +
      food +
      "&apiKey=344c39f083fc4d8dac4a76e6e15bd196",
    method: "GET",
  })
  .then(function (response) {
    console.log(response);
  });
}

function winePairing(food) {
  // request wine information/ steak pairing
  $.ajax({
    url:
      "https://api.spoonacular.com/food/wine/pairing?food=" +
      food +
      "&apiKey=3be041b3f9c84afaa2bb5ee16a7b4c01",
    method: "GET",
  }).then(function wine(wineEl) {
    console.log(wineEl);
  });

  function randomnumber(max) {
    return Math.floor(Math.random() * Math.floor(max) + 1);
  }
}

console.log(randomnumber(3));
