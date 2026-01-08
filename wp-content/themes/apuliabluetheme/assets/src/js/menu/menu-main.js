import { MenuLanguageSwitcher } from "./menu-language-switcher.js";
import { MobileMenu } from "./mobile-menu.js";
import { NavigationMenuHelper as HelperNavigationMenu } from "./navigation-menu-helper.js";
import { NavigationMenu } from "./navigation-menu.js";
import { ResponsiveFunctions } from "./responsive-functions.js";
import { SubMenuAccessibility } from "./sub-menu-accessibility.js";

var $;

export function menuMain(jquery) {
  $ = jquery;

  const responsiveFunctions = new ResponsiveFunctions();
  const helperNavigationMenu = new HelperNavigationMenu(responsiveFunctions);
  const navigationMenu = new NavigationMenu(
    responsiveFunctions,
    helperNavigationMenu
  );
  const mobileMenu = new MobileMenu(responsiveFunctions);
  const subMenuAccessibility = new SubMenuAccessibility(helperNavigationMenu);
  const menuLanguageSwitcher = new MenuLanguageSwitcher();

  responsiveFunctions.init($);
  helperNavigationMenu.init($);
  navigationMenu.init($);
  mobileMenu.init($);
  subMenuAccessibility.init($);
  menuLanguageSwitcher.init($);
}
