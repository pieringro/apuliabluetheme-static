export class NavigationMenuHelper {
  constructor(responsiveFunctions) {
    this.responsiveFunctions = responsiveFunctions;
  }

  init(jquery) {
    $ = jquery;

    this.mouseLeaveExecuting = [];
    this.closingDelay = 3000;
  }

  isSubMenuOpen($target) {
    return $target.hasClass("hovered") || $target.hasClass("clicked");
  }

  openSubMenu($target) {
    this.closeSiblings($target);
    $target.addClass("hovered clicked");

    const $subMenu = $target.children(".sub-menu");
    $subMenu.addClass("display-flex-with-animation");

    if (this.responsiveFunctions.isDesktopView()) {
      this.adjustSubMenuPosition($target, $subMenu);
    }
  }

  closeSubMenu($target) {
    this.closeSiblings($target);
    $target.removeClass("hovered clicked");

    const $subMenu = $target.children(".sub-menu");
    $subMenu.removeClass("display-flex-with-animation");
  }

  closeSiblings($target) {
    this.stopAllMouseLeaveExecuting();
    $target
      .siblings(".menu-item-has-children")
      .removeClass("clicked hovered")
      .children(".sub-menu")
      .removeClass("display-flex-with-animation");
  }

  stopAllMouseLeaveExecuting() {
    const keys = Object.keys(this.mouseLeaveExecuting);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      clearTimeout(this.mouseLeaveExecuting[key]);
      delete this.mouseLeaveExecuting[key];
    }
  }

  stopMouseLeaveExecuting($target) {
    clearTimeout(this.mouseLeaveExecuting[$target[0].id]);
  }

  startMouseLeaveExecuting($target) {
    this.mouseLeaveExecuting[$target[0].id] = setTimeout(
      () => this.closeSubMenu($target),
      this.closingDelay
    );
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
}
