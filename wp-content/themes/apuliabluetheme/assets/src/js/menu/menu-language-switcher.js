var $;

export class MenuLanguageSwitcher {
  constructor() {}
  init(jquery) {
    $ = jquery;

    // todo content che deve essere popolato
    this.$dropdownButton = $(".dropdown-button");
    this.$dropdownContent = $(".dropdown-content a");
    this.$document = $(document);

    this.initEvents();
  }

  initEvents() {
    this.$dropdownButton.on("click", (event) =>
      this.#dropdownButtonClickCallback(event)
    );

    this.$dropdownContent.on("click", (event) =>
      this.#dropdownContentLinksClickCallback(event)
    );

    this.$document.on("click", () => this.#documentClickCallback());
  }

  #dropdownButtonClickCallback(event) {
    event.stopPropagation();
    if ($(".dropdown-content").is(":visible")) {
      this.#hideMenuLanguageSwitcher();
    } else {
      this.#showMenuLanguageSwitcher();
    }
  }

  #hideMenuLanguageSwitcher() {
    $(".dropdown-content").removeClass("display-block-with-fading");
    $(".dropdown-content").addClass("display-none");
    $(".dropdown-button i").removeClass("fa-arrow-up");
    $(".dropdown-button i").addClass("fa-arrow-down");
  }

  #showMenuLanguageSwitcher() {
    $(".dropdown-content").removeClass("display-none");
    $(".dropdown-content").addClass("display-block-with-fading");
    $(".dropdown-button i").removeClass("fa-arrow-down");
    $(".dropdown-button i").addClass("fa-arrow-up");
  }

  #dropdownContentLinksClickCallback(event) {
    event.preventDefault();
    const selectedValue = event.target.closest("a").dataset.value;
    const selectedImg = event.target.closest("a").dataset.img;

    $(".dropdown-button img").attr("src", selectedImg);
    $(".dropdown-button img").attr("alt", selectedValue);
    $(".dropdown-button img").attr("title", selectedValue);

    $(".dropdown-content").hide();
  }

  #documentClickCallback() {
    this.#hideMenuLanguageSwitcher();
  }
}
