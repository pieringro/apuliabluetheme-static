var $;

export function reviewsMain(jquery) {
  $ = jquery;

  const reviewId = "#reviewsSwiper";

  const swiperParams = {
    loop: true,
    keyboard: {
      enabled: true,
    },
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: true,
    // },
    scrollbar: {
      el: reviewId + " .swiper-scrollbar",
      hide: true,
    },
    navigation: {
      nextEl: reviewId + " .swiper-button-next",
      prevEl: reviewId + " .swiper-button-prev",
    },

    slidesPerView: 2,
    spaceBetween: 10,
    breakpoints: {
      576: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
    },
  };

  var swiper = new Swiper(reviewId, swiperParams);

  const reviews = new Reviews();
  reviews.init($);
}

export class Reviews {
  constructor() {}

  init(jquery) {
    $ = jquery;
    this.$reviewReadMore = $(".review-read-more");
    this.initEvents();
  }

  initEvents() {
    this.$reviewReadMore.on("click", (event) =>
      this.#handleReadMoreClick(event)
    );
  }

  #handleReadMoreClick(event) {
    event.stopPropagation();
    console.log("review read more clicked", event);
    const id = event.currentTarget.id;
    const review = $("#" + id).closest(".review");
    const reviewClone = review.clone();
    reviewClone.find(".review-read-more").remove();

    const fullscreenOverlay = $(
      '<div class="review-fullscreen-overlay z-index-100"></div>'
    );
    const fullscreenContent = $(
      '<div class="review-fullscreen-content z-index-300"></div>'
    );

    const closeButton = $(
      '<button class="review-fullscreen-close z-index-301" aria-label="Chiudi">X</button>'
    );
    fullscreenContent.append(closeButton);

    fullscreenContent.append(reviewClone);

    fullscreenOverlay.append(fullscreenContent);
    $("body").append(fullscreenOverlay);
    $("body").css("overflow", "hidden");

    closeButton.on("click", () =>
      this.#closeFullScreenOverlay(fullscreenOverlay[0])
    );

    fullscreenOverlay.on("click", (event) => {
      if (event.target === fullscreenOverlay[0]) {
        this.#closeFullScreenOverlay(fullscreenOverlay[0]);
      }
    });

    $(document).on("keydown.reviewFullscreen", (event) => {
      if (event.key === "Escape") {
        this.#closeFullScreenOverlay(fullscreenOverlay[0]);
      }
    });
  }

  #closeFullScreenOverlay(overlayElement) {
    $(overlayElement).remove();
    $("body").css("overflow", "auto");
    $(document).off("keydown.reviewFullscreen");
  }
}
