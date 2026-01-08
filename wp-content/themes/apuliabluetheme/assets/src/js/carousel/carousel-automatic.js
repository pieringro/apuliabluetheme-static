var $;

export class CarouselAutomatic {
  constructor(carousel) {
    this.carousel = carousel;
  }

  init(jquery) {
    $ = jquery;

    this.initialize();
  }

  initialize() {
    this.carousel.setParameters({
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
    this.carousel.initializeCarousel(".carousel-automatic");
  }
}
