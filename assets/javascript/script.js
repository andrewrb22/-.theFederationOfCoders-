var instance = M.Carousel.init({
    fullWidth: true,
    indicators: true
  });

  // Or with jQuery

  $('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
  });
  $('.carousel').carousel();
  setInterval(function() {
    $('.carousel').carousel('next');
  }, 5000); // every 2 seconds