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
