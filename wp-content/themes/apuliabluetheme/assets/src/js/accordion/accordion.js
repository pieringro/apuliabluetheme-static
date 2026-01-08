var $;

export class Accordion {
  constructor() {
    this.setAccordionSelectors(this.defaultAccordionSelector);
  }

  defaultAccordionSelector = {
    boxes: ".accordion-box",
    detailsContainer: "#accordion-details-container",
    details: ".accordion-detail-content",
    upBack: "#accordion-up-back",
  };

  setAccordionSelectors(accordionSelector) {
    this.accordionBoxesSelector = accordionSelector.boxes;
    this.accordionDetailsSelector = accordionSelector.details;
    this.accordionDetailsContainerSelector = accordionSelector.detailsContainer;
    this.accordionUpBackSelector = accordionSelector.upBack;
  }

  init(jquery) {
    $ = jquery;

    this.#initialize();
  }

  #initialize() {
    this.$accordionBoxes = $(this.accordionBoxesSelector);
    this.$accordionDetails = $(this.accordionDetailsSelector);
    this.$accordionDetailsContainer = $(this.accordionDetailsContainerSelector);
    this.$accordionUpBack = $(this.accordionUpBackSelector);

    this.$accordionDetails.hide();
    this.$accordionUpBack.hide();

    this.#initEventListeners();
  }

  #initEventListeners() {
    // Gestore click sui box
    this.$accordionBoxes.on("click", (event) => {
      const $thisBox = $(event.currentTarget); // Il box cliccato
      const targetId = $thisBox.data("target"); // ID della sezione dettagli target
      const $targetDetail = $("#" + targetId); // La sezione dettagli target
      this.$accordionUpBack.show();

      // Controlla se la sezione cliccata è già attiva
      if ($thisBox.hasClass("active")) {
        // $targetDetail.slideUp(400);
        // $thisBox.removeClass("active");
      } else {
        // Se non è attiva:
        // 1. Chiudi tutte le altre sezioni aperte con animazione
        this.$accordionDetails.slideUp(400);

        // 2. Rimuovi la classe 'active' da tutti gli altri box
        this.$accordionBoxes.removeClass("active");

        // 3. Apri la sezione dettagli target con animazione
        $targetDetail.slideDown(400, () => {
          if (this.$accordionDetailsContainer.length) {
            $("html, body").animate(
              {
                scrollTop: this.$accordionDetailsContainer.offset().top - 100,
              },
              10
            );
          }
        });

        // 4. Aggiungi la classe 'active' al box cliccato
        $thisBox.addClass("active");
      }
    });
  }
}

export function alloggiMain(jquery) {
  $ = jquery;

  new Accordion($).init($);
}
