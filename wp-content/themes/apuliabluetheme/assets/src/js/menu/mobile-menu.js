var $;

export class MobileMenu {
  constructor(responsiveFunctions) {
    this.responsiveFunctions = responsiveFunctions;
  }

  #mobileMenuVisible = false;
  get mobileMenuVisible() {
    return this.#mobileMenuVisible;
  }

  init(jquery) {
    $ = jquery;

    this.$menuIcon = $("#menu-icon");
    this.$menuItems = $(".menu-item-has-children");
    this.$nav = $("nav");
    this.$subMenu = $(".sub-menu");

    this.initEvents();
  }

  initEvents() {
    this.$menuIcon.click((event) => this.handleMenuIconClick(event));
    this.$menuItems.on("click", (e) => this.handleMenuItemClick(e));
    $(document).on("click", (e) => this.handleDocumentClick(e));
    $(window).on("resize", () => this.handleResize());
  }

  handleMenuIconClick(event) {
    this.#toggleCollapsedMenu();
    event.stopPropagation();
  }

  handleMenuItemClick(event) {
    if (this.responsiveFunctions.isMobileView()) {
      const $target = $(event.currentTarget);
      this.#toggleSubMenu($target);
    }
    event.stopPropagation();
  }

  handleDocumentClick(e) {
    if (this.responsiveFunctions.isMobileView()) {
      if (!$(e.target).closest("#menu-apuliabluemenu").length) {
        this.#closeCollapsedMenu();
      }
    }
  }

  handleResize() {
    if (this.responsiveFunctions.isMobileView()) {
      this.#closeCollapsedMenu();
    }
  }

  #toggleCollapsedMenu() {
    this.#mobileMenuVisible = !this.#mobileMenuVisible;

    this.$nav.toggleClass("visible", this.#mobileMenuVisible);
    this.$nav.toggleClass("hidden", !this.#mobileMenuVisible);

    this.$menuIcon.toggleClass("fa-xmark", this.#mobileMenuVisible);
    this.$menuIcon.toggleClass("fa-bars", !this.#mobileMenuVisible);
  }

  #closeCollapsedMenu() {
    this.#mobileMenuVisible = false;

    this.$nav.removeClass("visible").addClass("hidden");
    this.$menuIcon.removeClass("fa-xmark").addClass("fa-bars");
    this.$menuItems.removeClass("clicked hovered");
    this.$subMenu.removeClass("display-flex-with-animation");
  }

  #toggleSubMenu($target) {
    this.#closeSiblings($target);
    $target.toggleClass("clicked");

    const $subMenu = $target.children(".sub-menu");
    $subMenu.toggleClass("display-flex-with-animation");
  }

  #closeSiblings($target) {
    $target
      .siblings(".menu-item-has-children")
      .removeClass("clicked")
      .children(".sub-menu")
      .removeClass("display-flex-with-animation");
  }
}
