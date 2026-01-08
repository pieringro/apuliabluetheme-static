var $;

export class Expandable {
  constructor() {
    this.setSelectors(this.defaultSelector);
  }

  defaultSelector = {
    expandableHeaders: ".expandable-header",
    expandableContents: ".expandable-content",
  };

  selector = this.defaultSelector;

  setSelectors(selector) {
    this.selector = selector;
  }

  init(jquery) {
    $ = jquery;

    this.#initialize();
  }

  #initialize() {
    this.expandableHeaders = $(this.selector.expandableHeaders);
    const expandableContentsSelector = this.selector.expandableContents;
    this.expandableContents = $(expandableContentsSelector);

    this.expandableHeaders.on("click", (event) => {
      const $this = $(event.currentTarget);
      const content = $this.next(expandableContentsSelector);

      // Chiude tutti i pannelli aperti, tranne quello cliccato
      this.expandableHeaders.not($this).removeClass("active");
      this.expandableContents.not(content).removeClass("active");

      // Apre o chiude il pannello cliccato e aggiunge/rimuove la classe 'active'
      $this.toggleClass("active");
      content.toggleClass("active");
    });
  }
}

// $(document).ready(function () {
//   const expandableHeaders = $(".expandable-header");

//   expandableHeaders.on("click", function () {
//     const $this = $(this);
//     const content = $this.next(".expandable-content");

//     // Chiude tutti i pannelli aperti, tranne quello cliccato
//     $(".expandable-header").not($this).removeClass("active");
//     $(".expandable-content").not(content).removeClass("active");

//     // Apre o chiude il pannello cliccato e aggiunge/rimuove la classe 'active'
//     $this.toggleClass("active");
//     content.toggleClass("active");
//   });
// });
