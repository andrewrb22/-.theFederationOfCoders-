var instance = M.Carousel.init({
    fullWidth: true,
    indicators: true
  });

  // Or with jQuery

  $('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
  });
  //auto play here and its in millaseconds
  $('.carousel').carousel();
  setInterval(function() {
    $('.carousel').carousel('next');
  }, 5000); // every 5 seconds