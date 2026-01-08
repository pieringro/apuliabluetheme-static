var $;

export class Carousel {
  constructor() {}

  static defaultCarouselClass = ".swiper-carousel";

  init(jquery) {
    $ = jquery;
  }

  setParameters(params, carouselId = "") {
    this.swiperParams = {
      slidesPerView: 1,
      spaceBetween: 10,
      // slidesPerView: "auto",
      // centeredSlides: true,
      // lazy: true,
      // autoplay: {
      //   delay: 3000,
      //   disableOnInteraction: true
      // },
      // loop: true,
      effect: "fade",
      keyboard: {
        enabled: true,
      },
      pagination: {
        el: carouselId + " .swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: carouselId + " .swiper-button-next",
        prevEl: carouselId + " .swiper-button-prev",
      },
      ...params,
    };
  }

  initializeCarousel(key) {
    let carouselId = key;
    if (key === undefined || key === null || key === "") {
      carouselId = Carousel.defaultCarouselClass;
    }
    var swiper = new Swiper(carouselId, this.swiperParams);
  }

  //#region Old Methods
  // initializeCarouselOld(key) {
  //   const carouselId = "#" + key + " .carousel-slider";
  //   $(carouselId).on(
  //     "afterChange",
  //     (event, slick, currentSlideIndex, nextSlide) => {
  //       console.log("slick afterchange", currentSlideIndex);
  //       const slides = slick.$slides;
  //       const currentSlide = slides[currentSlideIndex];
  //       const leftSlideIndex =
  //         currentSlideIndex === 0 ? slides.length - 1 : currentSlideIndex - 1;
  //       const leftSlide = slides[leftSlideIndex];
  //       const rightSlideIndex =
  //         currentSlideIndex === slides.length - 1 ? 0 : currentSlideIndex + 1;
  //       const rightSlide = slides[rightSlideIndex];

  //       for (let i = 0; i < slides.length; i++) {
  //         $(slides[i]).off("click");
  //       }

  //       $(currentSlide).on("click", (e) => {
  //         this.#onCurrentSlideClicked(e);
  //       });

  //       console.log(currentSlide);
  //     }
  //   );

  //   $(carouselId).slick({
  //     accessibility: true,
  //     arrows: true,
  //     variableWidth: true,
  //     infinite: true,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //     dots: true,
  //     adaptiveHeight: true,
  //     centerPadding: "50px",
  //     centerMode: true,
  //     // fade: true,

  //     responsive: [
  //       {
  //         breakpoint: 1200,
  //         settings: {
  //           slidesToShow: 1,
  //           slidesToScroll: 1,
  //         },
  //       },
  //       {
  //         breakpoint: 1024,
  //         settings: {
  //           slidesToShow: 1,
  //           slidesToScroll: 1,
  //         },
  //       },
  //       {
  //         breakpoint: 600,
  //         settings: {
  //           slidesToShow: 1,
  //           slidesToScroll: 1,
  //         },
  //       },
  //       {
  //         breakpoint: 300,
  //         settings: "unslick", // destroys slick
  //       },
  //     ],
  //   });

  //   $(carouselId).on("click", ".slick-slide:not(.slick-active)", function (e) {
  //     e.preventDefault();

  //     var slideIndex = $(this).data("slick-index");

  //     if (slideIndex !== undefined) {
  //       $(carouselId).slick("slickGoTo", parseInt(slideIndex));
  //     }
  //   });

  //   $(carouselId + " .slick-current").on("click", (e) => {
  //     this.#onCurrentSlideClicked(e);
  //   });
  // }

  // #onCurrentSlideClicked(event) {
  //   event.preventDefault();
  //   console.log("onCurrentSlideClicked: clicked", event);
  //   const selectorImageElement = "#" + event.currentTarget.id + " img";
  //   const imageUrl = $(selectorImageElement).attr("src");
  //   const imageAlt = $(selectorImageElement).attr("alt");

  //   const fullscreenOverlay = $(
  //     '<div class="slick-fullscreen-overlay z-index-100"></div>'
  //   );
  //   const fullscreenImage = $(
  //     `<img src="${imageUrl}" alt="${imageAlt}" class="slick-fullscreen-image z-index-300">`
  //   );

  //   fullscreenOverlay.append(fullscreenImage);
  //   $("body").append(fullscreenOverlay);

  //   $("body").css("overflow", "hidden");

  //   fullscreenOverlay.on("click", (event) =>
  //     this.#closeFullScreenOverlay(fullscreenOverlay[0], event)
  //   );

  //   fullscreenOverlay.on("keydown", (event) =>
  //     this.#closeFullScreenOverlay(fullscreenOverlay[0], event)
  //   );
  // }

  // #closeFullScreenOverlay(fullscreenOverlay, event) {
  //   if (event.target === fullscreenOverlay) {
  //     fullscreenOverlay.remove(); // Rimuovi l'overlay
  //     $("body").css("overflow", "auto"); // Riabilita lo scroll della pagina
  //   }
  // }
  //#endregion
}
