
export class NavigationMenu {
  constructor(responsiveFunctions, helper) {
    this.responsiveFunctions = responsiveFunctions;
    this.helper = helper;
  }

  init(jquery) {
    $ = jquery;

    this.$nav = $("nav");
    this.$navMenu = $("ul#menu-apuliabluemenu");
    this.$menuIcon = $("#menu-icon");
    this.$menuItems = $("li.menu-item");
    this.$menuItemsWithChildren = $("li.menu-item-has-children");
    this.$dynamicMenu = $(".ab-nav-menu-dynamic");

    this.applyAttributesToMenuItems();
    this.initEvents();
    this.handleScroll();
  }

  applyAttributesToMenuItems() {
    if (this.responsiveFunctions.isSM() || this.responsiveFunctions.isXS()) {
      this.$nav.addClass("hidden");
    }

    // this.$navMenu.attr("role", "menu");
    // this.$menuItems.attr("role", "menu-item");
  }

  initEvents() {
    this.$menuItemsWithChildren
      .on("mouseenter", (e) => this.handleMenuItemMouseEnter(e))
      .on("mouseleave", (e) => this.handleMenuItemMouseLeave(e));

    $(window)
      .on("scroll", () => this.handleScroll())
      .on("resize", () => this.handleResize());

    $(document).on("click", (e) => this.handleDocumentClick(e));
  }

  handleResize() {
    if (this.responsiveFunctions.isDesktopView()) {
      this.menuAlwaysOpen();
    }
  }

  menuAlwaysOpen() {
    this.$nav.addClass("visible").removeClass("hidden");
    this.$menuIcon.addClass("fa-xmark").removeClass("fa-bars");
  }

  closeCollapsedMenu() {
    this.$nav.removeClass("visible").addClass("hidden");
    this.$menuIcon.removeClass("fa-xmark").addClass("fa-bars");
    this.$menuItemsWithChildren.removeClass("clicked hovered");
    $(".sub-menu").removeClass("display-flex-with-animation");
  }

  adjustSubMenuPosition($target, $subMenu) {
    const $parentSubMenu = $target.closest(".sub-menu");
    if (!$parentSubMenu.length) return;

    const parentWidth = $parentSubMenu.outerWidth();
    $subMenu.css({
      left: `${parentWidth + 10}px`,
      top: `${$target.position().top - $target.outerHeight() / 2 - 10}px`,
    });

    if (!$subMenu.isInViewport()) {
      $subMenu.css({
        left: `-${$subMenu.outerWidth()}px`,
        top: `${$target.position().top - $target.outerHeight() / 2 - 4}px`,
      });
    }
  }

  handleScroll() {
    this.$dynamicMenu.toggleClass("menu-scroll", $(window).scrollTop() >= 10);
    this.$dynamicMenu.toggleClass("menu-scroll-far", $(window).scrollTop() >= 700);
  }

  handleDocumentClick(e) {
    if (this.responsiveFunctions.isDesktopView()) {
      if (!$(e.target).closest(".menu-item-has-children").length) {
        this.helper.closeSubMenu(this.$menuItemsWithChildren);
      }
    }
  }

  handleMenuItemMouseEnter(e) {
    if (this.responsiveFunctions.isDesktopView()) {
      const $target = $(e.currentTarget);
      this.helper.stopAllMouseLeaveExecuting();
      this.helper.openSubMenu($target);
    }
  }

  handleMenuItemMouseLeave(e) {
    if (this.responsiveFunctions.isDesktopView()) {
      const $target = $(e.currentTarget);
      this.helper.stopMouseLeaveExecuting($target);
      this.helper.startMouseLeaveExecuting($target);
    }
  }
}
