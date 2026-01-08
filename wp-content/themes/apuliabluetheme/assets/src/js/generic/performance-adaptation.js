import { isConnectionSlow } from "./utility.js";

// const videoUrl = "https://www.apuliablue.it/wp-content/uploads/2024/06/ApuliaBlue-Video-Background.mp4";
// const videoUrl =
//   "./wp-content/themes/apuliabluetheme/assets/media/bg-video.mp4";
// const imageUrl =
//   "./wp-content/themes/apuliabluetheme/assets/media/bg-image.jpg";

export class PerformanceAdaptation {
  constructor(jquery) {
    this.$ = jquery;

    if (window.apuliaConfig) {
      this.videoUrl = window.apuliaConfig.videoUrl;
      this.imageUrl = window.apuliaConfig.imageUrl;
    } else {
      console.error("Errore: apuliaConfig non trovato nell'HTML");
    }
  }

  init() {
    this.$videoElement = this.$("#background-video");
    this.$imageElement = this.$("#background-image");

    if (this.$videoElement.length && this.$imageElement.length) {
      if (isConnectionSlow()) {
        console.log("Slow connection detected");
        this.#adaptToSlowConnection();
      } else {
        console.log("Fast connection detected");
        this.#fastConnection();
      }
    } else {
      this.#showWhatAvailable();
    }
  }

  #showWhatAvailable() {
    if (this.$videoElement.length) {
      this.#setVideoBackground();
    }
    if (this.$imageElement.length) {
      this.#setImageBackground();
    }
  }

  #adaptToSlowConnection() {
    if (this.$imageElement.length) {
      this.#setImageBackground();
    }
    if (this.$videoElement.length) {
      this.$videoElement.remove();
    }
  }

  #fastConnection() {
    if (this.$imageElement.length) {
      this.$imageElement.remove();
    }

    if (this.$videoElement.length) {
      this.#setVideoBackground();
    }
  }

  #setImageBackground() {
    if (!this.$imageElement.attr("src")) {
      this.$imageElement.attr("src", this.imageUrl);
    }
    this.$imageElement.show();
  }

  #setVideoBackground() {
    const videoSource = $("<source>")
      .attr("src", this.videoUrl)
      .attr("type", "video/mp4");
    this.$videoElement.append(videoSource);
    this.$videoElement.show(); // Mostra il video
    this.$videoElement[0].load();
    this.$videoElement[0].play();
  }
}
