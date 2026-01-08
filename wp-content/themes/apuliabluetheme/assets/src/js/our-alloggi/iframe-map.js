export class IFrameMap {
  constructor(jquery) {
    this.$ = jquery;
  }

  init() {
    this.#initMap();
  }
  #initMap() {
    const $ = this.$;
    const $iframeContainer = $(".iframe-container");
    const $iframeOverlayHider = $iframeContainer.find(".iframe-overlay-hider");

    $iframeOverlayHider.on("click", function () {
      $iframeOverlayHider.hide();
    });
  }
}
