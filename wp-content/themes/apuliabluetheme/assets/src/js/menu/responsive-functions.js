var $;

var xsWidth = 576;
var smWidth = 768;
var mdWidth = 992;

export class ResponsiveFunctions {
  constructor() {}

  init(jquery) {
    $ = jquery;
  }

  isMobileView() {
    return this.isXS() || this.isSM();
  }

  isDesktopView() {
    return this.isMD() || this.isLg();
  }

  isXS() {
    //menu nascosto
    return window.innerWidth < xsWidth;
  }
  isSM() {
    //menu nascosto
    return window.innerWidth >= xsWidth && window.innerWidth < smWidth;
  }
  isMD() {
    return window.innerWidth >= smWidth && window.innerWidth < mdWidth;
  }
  isLg() {
    return window.innerWidth >= mdWidth;
  }
}
