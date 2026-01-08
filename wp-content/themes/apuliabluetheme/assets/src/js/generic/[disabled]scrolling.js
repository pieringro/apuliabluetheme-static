export class Scrolling {
  constructor(jquery) {
    this.$ = jquery;
  }

  init() {
    this.#initChangeVideoScrolling();
  }

  #initChangeVideoScrolling() {
    const backgroundVideo = $("#background-video")[0]; // Ottieni l'elemento video nativo
    const videoSource = $("#background-video source");

    const videoPaths = [
      {
        src: "/wp-content/themes/apuliabluetheme/assets/media/water-river-zoom.mp4",
        scrollPoint: $(document).height() * 0.5,
      },
    ];
    // "/wp-content/themes/apuliabluetheme/assets/media/video-background1.mp4",

    // const scrollPoints = [$(document).height() * 0.5, $(document).height() * 1];

    let currentVideoIndex = 0;

    $(window).scroll(function () {
      const scrollTop = $(window).scrollTop();

      for (let i = 0; i < videoPaths.length; i++) {
        const scrollPoint = videoPaths[currentVideoIndex].scrollPoint;
        const sourceVideo = videoPaths[currentVideoIndex].src;

        if (i + 1 < videoPaths.length) {
          if (scrollTop >= scrollPoint && i + 1 > currentVideoIndex) {
            currentVideoIndex = i + 1;
            changeBackgroundVideo(sourceVideo);
            break;
          } else if (
            scrollTop < scrollPoint &&
            i + 1 === currentVideoIndex &&
            i >= 0
          ) {
            currentVideoIndex = i;
            changeBackgroundVideo(sourceVideo);
            break;
          }
        }
      }

      if (scrollTop === 0 && currentVideoIndex !== 0) {
        currentVideoIndex = 0;
        changeBackgroundVideo(videoPaths[currentVideoIndex].src);
      }
    });

    function changeBackgroundVideo(newVideoPath) {
      if (videoSource.attr("src") === newVideoPath) {
        return;
      }
      videoSource.attr("src", newVideoPath);
      backgroundVideo.load();
      backgroundVideo.play();
    }
  }
}
