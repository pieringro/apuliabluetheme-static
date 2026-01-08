import { dateFormat, momentDefaultFormat } from "../generic/utility.js";
import { BookNow } from "./book-now.js";

var $;

export function bookNowMain(jquery) {
  const bookNow = new BookNow(jquery);
  bookNow.init();
}
