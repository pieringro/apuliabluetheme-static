import { isInViewport } from "./utility.js";

export var $;

export function setupJQuery(mainFunctionsList) {
  jQuery(document).ready(function (jquery) {
    $ = jquery;
    $.fn.isInViewport = isInViewport;

    mainFunctionsList.forEach((mainFunction) => {
      mainFunction($);
    });
  });
}
