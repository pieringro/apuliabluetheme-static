var $;
export class SubMenuAccessibility {
  constructor(helperNavigationMenu) {
    this.#helperNavigationMenu = helperNavigationMenu;
  }

  #helperNavigationMenu;
  #currentMenuItemLiSelected;
  #indexMenuItemLiSelected;
  #indexSubMenuItemLiSelected;

  init(jquery) {
    $ = jquery;

    this.$menuApuliablue = $("#menu-apuliabluemenu");
    this.$everyMenuItemsLi = $("li.menu-item");
    this.$firstMenuItemsLi = $("#menu-apuliabluemenu > li.menu-item");
    this.$menuItemsAnchor = $(".menu-item a");
    this.#indexMenuItemLiSelected = -1;
    this.#indexSubMenuItemLiSelected = -1;
    this.stackMenuItems = [];

    this.initAccessAttributes();
    this.initEvents();
  }

  initAccessAttributes() {
    this.$menuApuliablue.attr("tabindex", 0);
    this.$everyMenuItemsLi.attr("tabindex", -1);
    this.$firstMenuItemsLi.attr("tabindex", -1);
    this.$menuItemsAnchor.attr("tabindex", -1);
  }

  initEvents() {
    this.$menuApuliablue.on("keydown", (event) => this.#menuCallback(event));
  }

  #menuCallback(event) {
    console.log("subMenuCallback", event.which);
    switch (event.which) {
      case 9:
        this.#resetTabbing();
        break;
      case 37:
        this.#leftArrow();
        event.preventDefault();
        break;
      case 38:
        this.#upArrow();
        event.preventDefault();
        break;
      case 39:
        this.#rightArrow();
        event.preventDefault();
        break;
      case 40:
        this.#bottomArrow();
        event.preventDefault();
        break;
    }
  }

  #resetTabbing() {
    this.#indexMenuItemLiSelected = -1;
    this.#indexSubMenuItemLiSelected = -1;
  }

  #leftArrow() {
    if (this.#indexMenuItemLiSelected <= 0) {
      this.#indexMenuItemLiSelected = this.$firstMenuItemsLi.length - 1;
    } else {
      this.#indexMenuItemLiSelected--;
    }
    this.#updateMenuItemLiSelected();
  }

  #rightArrow() {
    if (this.#indexMenuItemLiSelected === this.$firstMenuItemsLi.length - 1) {
      this.#indexMenuItemLiSelected = 0;
    } else {
      this.#indexMenuItemLiSelected++;
    }
    this.#updateMenuItemLiSelected();
  }

  #upArrow() {}

  #bottomArrow() {
    const menuItemLiSelected = this.$firstMenuItemsLi.eq(
      this.#indexMenuItemLiSelected
    );
    if (menuItemLiSelected.hasClass("menu-item-has-children")) {
      if (this.#helperNavigationMenu.isSubMenuOpen(menuItemLiSelected)) {
        const menuItemsChildren = menuItemLiSelected
          .children(".sub-menu")
          .children(".menu-item");

        if (this.#indexSubMenuItemLiSelected === menuItemsChildren.length - 1) {
          this.#indexSubMenuItemLiSelected = 0;
        } else {
          this.#indexSubMenuItemLiSelected++;
        }

        menuItemsChildren[this.#indexSubMenuItemLiSelected].focus();
      } else {
        this.#helperNavigationMenu.openSubMenu(menuItemLiSelected);
      }
    }
  }

  #updateMenuItemLiSelected() {
    this.#currentMenuItemLiSelected = this.$firstMenuItemsLi.eq(
      this.#indexMenuItemLiSelected
    );
    this.#currentMenuItemLiSelected.focus();
  }

  // subMenuClearKeydownEvents($target) {
  //   for (let i = 0; i < $target.length; i++) {
  //     let element = $target[i];
  //     let subMenuCallback = $(element).data(`subMenuCallback${element.id}`);
  //     if (subMenuCallback) {
  //       $(element).off("keydown", "", subMenuCallback);
  //       $(element).data(`subMenuCallback${element.id}`, null);
  //     }
  //   }
  // }
}
