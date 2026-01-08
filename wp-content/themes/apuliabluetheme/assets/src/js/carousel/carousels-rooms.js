var $;

export class CarouselRooms {
  constructor(carousels) {
    this.carousels = carousels;
  }

  #allRoomsKeys = [];

  init(jquery) {
    $ = jquery;

    this.$roomBtn = $(".room-btn");

    this.initEvents();
    this.initFirstRoomOpened();
  }

  initEvents() {
    this.$roomBtn.on("click", (event) => this.#handleRoomBtnClick(event));
  }

  initFirstRoomOpened() {
    // $(this.$roomBtn[0]).children("img").trigger("click");
    $(this.$roomBtn[0]).trigger("click");
  }

  #handleRoomBtnClick(event) {
    event.stopPropagation();

    const roomBtnClicked = $(event.target).closest("button");

    roomBtnClicked.addClass("active");
    this.$roomBtn.not(roomBtnClicked).removeClass("active");
    const key = $(event.target).closest(".room-btn").val();

    if (this.#allRoomsKeys.indexOf(key) === -1) {
      this.#allRoomsKeys.push(key);
      this.carousels.setParameters();
      this.carousels.initializeCarousel("#" + key);
    }
    this.#allRoomsKeys.forEach((roomKey) => {
      $("#" + roomKey).addClass("display-none");
    });

    $("#" + key).removeClass("display-none");
  }
}
