import { Expandable } from "../accordion/expandable.js";

var $;

export function bleisureTravelMain(jquery) {
  $ = jquery;

  const expandable = new Expandable();
  expandable.init($);
}
