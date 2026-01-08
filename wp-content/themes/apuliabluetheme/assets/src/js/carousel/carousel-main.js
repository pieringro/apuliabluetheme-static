import { CarouselAutomatic } from "./carousel-automatic.js";
import { CarouselRooms } from "./carousels-rooms.js";
import { Carousel } from "./carousels.js";

var $;

export function carouselMain(jquery) {
  $ = jquery;

  const carousels = new Carousel();
  carousels.init($);
  const carouselsRooms = new CarouselRooms(carousels);
  carouselsRooms.init($);
  const carouselAutomatic = new CarouselAutomatic(carousels);
  carouselAutomatic.init($);

  // let carouselsList = $(".carousel-slider");

  // for (let i = 0; i < carouselsList.length; i++) {
  //   $(carouselsList[i]).slick({
  //     accessibility: true,
  //     arrows: true,
  //     variableWidth: true,
  //     infinite: true,
  //     slidesToShow: 2,
  //     slidesToScroll: 2,
  //     dots: true,
  //     adaptiveHeight: true,
  //     centerPadding: "50px",
  //     centerMode: true,
  //     // fade: true,

  //     responsive: [
  //       {
  //         breakpoint: 1200,
  //         settings: {
  //           slidesToShow: 2,
  //           slidesToScroll: 2,
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
  // }
}
