// carousel code from materialize
$('.carousel.carousel-slider').carousel({
  fullWidth: true,
  indicators: true
});

$(".btn").on("click", function(){
  //testing the buttons
  alert("you clicked ");
})
  //auto play here and its in millaseconds
  $('.carousel').carousel();
  setInterval(function() {
    $('.carousel').carousel('next');
  }, 5000); // every 5 seconds
// request wine information/ steak pairing
  $.ajax({
url : "https://api.spoonacular.com/food/wine/pairing?food=steak&apiKey=3be041b3f9c84afaa2bb5ee16a7b4c01",
method : "GET"
  }).then(function wine(wineEl) {
   console.log(wineEl);
  })