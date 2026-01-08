import { animateMain } from "./animate.js";
import { bleisureTravelMain } from "./bleisure-travel/bleisure-travel-main.js";
import { carouselMain } from "./carousel/carousel-main.js";
import { headerMain } from "./generic/header-main.js";
import { setupJQuery } from "./generic/setup-jquery-main.js";
import { menuMain } from "./menu/menu-main.js";
import { alloggiMain } from "./our-alloggi/our-alloggi.js";
import { reviewsMain } from "./reviews/reviews.js";

const mainFunctionsList = [
  animateMain,
  menuMain,
  headerMain,
  carouselMain,
  reviewsMain,
  alloggiMain,
  bleisureTravelMain,
];

setupJQuery(mainFunctionsList);
