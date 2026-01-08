import { dateFormat, momentDefaultFormat } from "../generic/utility.js";
// import moment from "moment";

export class BookNow {
  constructor(jquery) {
    this.$ = jquery;
    moment.locale("it");
  }

  init() {
    this.#initDateRangePicker();
    this.#initReservationForm();
    this.#initGuestsNumber();
  }

  #initDateRangePicker() {
    const startDate = moment().format(momentDefaultFormat);
    console.log(startDate);

    this.$("#checkin").click(() => this.$("#checkin-input").focus());

    this.$("#checkin-input").daterangepicker(
      {
        opens: "center",
        drops: "up",
        autoApply: true,
        timePicker: false,
        minDate: moment(),
        startDate: moment(),
        endDate: moment().add(1, "days"),
        locale: { format: momentDefaultFormat },
      },
      (start, end) => {
        console.log(
          `A new date selection was made: ${start.format(
            "YYYY-MM-DD"
          )} to ${end.format("YYYY-MM-DD")}`
        );
      }
    );

    this.$("#checkin-input").on("show.daterangepicker", () => {
      const inputOffset = this.$("#checkin").offset();
      const left = inputOffset.left;
      this.$(".daterangepicker").css({ left: left });
    });

    this.$("#checkin-input").on("hide.daterangepicker", () => {});

    const today = moment().format(momentDefaultFormat);
    const tomorrow = moment().add(1, "days").format(momentDefaultFormat);
    this.$("#checkin-input").val(`${today} - ${tomorrow}`);
  }

  #initReservationForm() {
    this.$("#open-reservation").click(() => {
      this.$("#open-reservation")
        .css({ opacity: 1 })
        .removeClass("animated-button");
      this.#openReservationForm();
    });

    this.$("#reservation-close-btn").click(() => this.#closeReservationForm());
    this.$("#reservation-form-submit").click((event) => {
      event.preventDefault();
      this.#submitReservation();
    });
  }

  // #updateGuestsAdultsValue() {
  //   this.$("#guests-number-value").text(this.guestsAdultsValue);
  // }

  // #updateRoomsValue() {
  //   this.$("#rooms-number-value").text(this.roomsValue);
  // }

  #openReservationForm() {
    this.$("#btn-reserve-wrapper")
      .css({ "pointer-events": "none" })
      .animate({ bottom: 0, opacity: 0 }, 500, () => {
        this.$("#reservation-form")
          .css({ display: "block", opacity: 0, "pointer-events": "auto" })
          .animate({ "margin-bottom": "30px", opacity: 1 }, 1000);
      });
  }

  #closeReservationForm() {
    this.$("#reservation-form")
      .css({ "pointer-events": "none" })
      .animate({ opacity: 0, "margin-bottom": "0px" }, 500, () => {
        this.$("#btn-reserve-wrapper").animate(
          { opacity: 1, bottom: 30 },
          500,
          () => {
            this.$("#btn-reserve-wrapper").css({ "pointer-events": "auto" });
          }
        );
      });
  }

  #submitReservation() {
    const formatDatesFromTo = (dateRange) => {
      const [startDate, endDate] = dateRange.split(" - ");
      return {
        startDate: moment(startDate, "DD MMM YYYY").format("YYYY-MM-DD"),
        endDate: moment(endDate, "DD MMM YYYY").format("YYYY-MM-DD"),
      };
    };

    const baseUrl = "https://apuliablue.kross.travel/";
    const rooms = this.$("#rooms-number-value").text();
    const guests = this.$("#guests-number-value").text();
    const dates = formatDatesFromTo(this.$("#checkin-input").val());
    const params = `rooms=${rooms}&guests=${guests}&from=${dates.startDate}&to=${dates.endDate}&kross_lang=it`;
    location.href = `${baseUrl}?${params}`;
  }

  #initGuestsNumber() {
    this.guestsAdultsValues = [2]; // Array per gestire gli adulti per ogni camera
    this.roomsValue = 1;

    this.updateGuestsNumberDisplay();
    this.createGuestsNumberPopup();
  }

  createGuestsNumberPopup() {
    this.guestsNumberPopup = this.$("<div>", {
      id: "guests-number-popup",
      class: "guests-number-popup z-index-301",
    });

    this.updateGuestsNumberPopupContent();
    this.$("body").append(this.guestsNumberPopup);
    this.guestsNumberPopup.hide();
    this.attachGuestsNumberPopupEvents();
  }

  updateGuestsNumberPopupContent() {
    let html = `
      <div>
        <div class="guests-number-popup-wrapper">

          <div class="form-row">
            <label for="rooms-number-popup">Camere</label>
            <div class="input-group">
              <button id="rooms-number-popup-decrease" type="button" class="minus">-</button>
              <input type="text" id="rooms-number-popup-value" value="${
                this.roomsValue
              }">
              <button id="rooms-number-popup-increase" type="button" class="plus">+</button>
            </div>
          </div>

          ${this.guestsAdultsValues
            .map(
              (adults, index) => `
            <div class="form-row">
              <label for="guests-adults-number-popup-${index}">Adulti Camera ${
                index + 1
              }</label>
              <div class="input-group">
                <button data-index="${index}" class="minus guests-number-popup-decrease" type="button">-</button>
                <input type="text" data-index="${index}" class="guests-number-popup-value" value="${adults}">
                <button data-index="${index}" class="plus guests-number-popup-increase" type="button">+</button>
              </div>
            </div>
          `
            )
            .join("")}
          
        </div>
      </div>
    `;
    this.guestsNumberPopup.html(html);
  }

  attachGuestsNumberPopupEvents() {
    this.$("#guests-number-btn, #rooms-number-btn").click(() => {
      this.guestsNumberPopup.toggle();
      this.positionPopup(this.guestsNumberPopup);
    });

    this.$(document).click((event) => {
      if (
        !this.$(event.target).closest("#guests-number-btn").length &&
        !this.$(event.target).closest("#rooms-number-btn").length &&
        !this.$(event.target).closest("#guests-number-popup").length &&
        !this.$(event.target).closest("#rooms-number-popup-increase").length &&
        !this.$(event.target).closest("#rooms-number-popup-decrease").length
      ) {
        this.guestsNumberPopup.hide();
      }
    });

    this.guestsNumberPopup.on(
      "click",
      ".guests-number-popup-increase",
      (event) => {
        const index = parseInt(this.$(event.target).data("index"));
        this.guestsAdultsValues[index]++;
        this.updateGuestsNumberPopupContent();
        this.attachGuestsNumberPopupEvents();
        this.updateGuestsNumberDisplay();
      }
    );

    this.guestsNumberPopup.on(
      "click",
      ".guests-number-popup-decrease",
      (event) => {
        const index = parseInt(this.$(event.target).data("index"));
        if (this.guestsAdultsValues[index] > 1) {
          this.guestsAdultsValues[index]--;
          this.updateGuestsNumberPopupContent();
          this.updateGuestsNumberDisplay();
        }
      }
    );

    this.$("#rooms-number-popup-increase").click(() => {
      this.roomsValue++;
      this.guestsAdultsValues.push(2); // Aggiungi un nuovo form di adulti con valore iniziale 2
      this.updateGuestsNumberPopupContent();
      this.updateGuestsNumberDisplay();
    });

    this.$("#rooms-number-popup-decrease").click(() => {
      if (this.roomsValue > 1) {
        this.roomsValue--;
        this.guestsAdultsValues.pop(); // Rimuovi l'ultimo form di adulti
        this.updateGuestsNumberPopupContent();
        this.updateGuestsNumberDisplay();
      }
    });
  }

  updateGuestsNumberDisplay() {
    const totalAdults = this.guestsAdultsValues.reduce(
      (sum, value) => sum + value,
      0
    );
    this.$("#guests-number-value").text(totalAdults);
    this.$("#rooms-number-value").text(this.roomsValue);
  }

  positionPopup(popup) {
    const button = this.$("#guests-number-btn")[0];
    const buttonRect = button.getBoundingClientRect();
    const popupWidth = popup.outerWidth();
    popup.css({
      top: buttonRect.top - popup.outerHeight() - 10,
      left: buttonRect.left + buttonRect.width / 2 - popupWidth / 2,
    });
  }

  // #initGuestsNumber() {
  //   this.guestsAdultsValue = 2;
  //   this.roomsValue = 1;

  //   this.$("#guests-number-value").text(this.guestsAdultsValue);
  //   this.$("#rooms-number-value").text(this.roomsValue);

  //   this.guestsNumberPopup = this.$("<div>", {
  //     id: "guests-number-popup",
  //     class: "guests-number-popup z-index-301",
  //     html: `
  //       <div>
  //         <div class="guests-number-popup-wrapper">
  //           <div class="form-row">
  //             <label for="guests-adults-number-popup">Adulti</label>
  //             <div class="input-group">
  //               <button id="guests-number-popup-decrease" type="button" class="minus">-</button>
  //               <input type="text" id="guests-number-popup-value" value="${this.guestsAdultsValue}">
  //               <button id="guests-number-popup-increase" type="button" class="plus">+</button>
  //             </div>
  //           </div>
  //           <div class="form-row">
  //             <label for="rooms-number-popup">Camere</label>
  //             <div class="input-group">
  //               <button id="rooms-number-popup-decrease" type="button" class="minus">-</button>
  //               <input type="text" id="rooms-number-popup-value" value="${this.roomsValue}">
  //               <button id="rooms-number-popup-increase" type="button" class="plus">+</button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     `,
  //   });

  //   this.$("body").append(this.guestsNumberPopup);
  //   this.guestsNumberPopup.hide();

  //   this.$("#guests-number-btn, #rooms-number-btn").click(() => {
  //     this.guestsNumberPopup.toggle();
  //     this.#positionPopup(this.guestsNumberPopup);
  //   });

  //   this.$(document).click((event) => {
  //     if (
  //       !this.$(event.target).closest("#guests-number-btn").length &&
  //       !this.$(event.target).closest("#rooms-number-btn").length &&
  //       !this.$(event.target).closest("#guests-number-popup").length
  //     ) {
  //       this.guestsNumberPopup.hide();
  //     }
  //   });

  //   this.$("#guests-number-popup-increase").click(() => {
  //     this.guestsAdultsValue++;
  //     this.$("#guests-number-popup-value").val(this.guestsAdultsValue);
  //     this.#updateGuestsAdultsValue();
  //   });

  //   this.$("#guests-number-popup-decrease").click(() => {
  //     if (this.guestsAdultsValue > 1) {
  //       this.guestsAdultsValue--;
  //       this.$("#guests-number-popup-value").val(this.guestsAdultsValue);
  //       this.#updateGuestsAdultsValue();
  //     }
  //   });

  //   this.$("#rooms-number-popup-increase").click(() => {
  //     this.roomsValue++;
  //     this.$("#rooms-number-popup-value").val(this.roomsValue);
  //     this.#updateRoomsValue();
  //   });

  //   this.$("#rooms-number-popup-decrease").click(() => {
  //     if (this.roomsValue > 1) {
  //       this.roomsValue--;
  //       this.$("#rooms-number-popup-value").val(this.roomsValue);
  //       this.#updateRoomsValue();
  //     }
  //   });
  // }

  // #positionPopup(popup) {
  //   const button = this.$("#guests-number-btn")[0];
  //   const buttonRect = button.getBoundingClientRect();
  //   const popupWidth = popup.outerWidth();
  //   popup.css({
  //     top: buttonRect.top - popup.outerHeight() - 10,
  //     left: buttonRect.left + buttonRect.width / 2 - popupWidth / 2,
  //   });
  // }
}
