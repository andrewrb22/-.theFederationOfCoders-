// carousel code from materialize
$('.carousel.carousel-slider').carousel({
  fullWidth: true,
  indicators: true
});

$(".btn").on("click", function(){
  //testing the buttons
  alert("you clicked " + $(this).toString(attr("data-food")));

})