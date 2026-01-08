import { Accordion } from "../accordion/accordion.js";
import { IFrameMap } from "./iframe-map.js";

var $;

export function alloggiMain(jquery) {
  $ = jquery;

  const accordion = new Accordion();
  accordion.setAccordionSelectors({
    boxes: ".alloggi-box",
    detailsContainer: "#alloggi-details-container",
    details: ".alloggi-detail-content",
    upBack: "#alloggi-up-back",
  });
  accordion.init($);

  const iframeMap = new IFrameMap($);
  iframeMap.init();
}




