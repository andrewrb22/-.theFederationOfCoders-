// carousel code from materialize
$('.carousel.carousel-slider').carousel({
  fullWidth: true,
  indicators: true
});

$(".btn").on("click", function () {
  //testing the buttons
  alert("you clicked ");
})
//auto play here and its in millaseconds
$('.carousel').carousel();
setInterval(function () {
  $('.carousel').carousel('next');
}, 5000); // every 5 seconds

var myAPI = "344c39f083fc4d8dac4a76e6e15bd196"

var queryURL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + myAPI;

$.ajax({
  url: queryURL,
  method: "GET"
})

  .then(function (response) {

    console.log(response);

  })
