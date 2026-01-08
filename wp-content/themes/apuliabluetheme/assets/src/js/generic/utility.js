import { $ } from "./setup-jquery-main.js";

export function isInViewport() {
  var elementOffset = $(this).offset();
  let elementOuterWidth = $(this).outerWidth();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  var viewportLeft = $(window).scrollLeft();
  var viewportRight = viewportLeft + window.innerWidth;

  return (
    elementOffset.top >= viewportTop &&
    elementOffset.top <= viewportBottom &&
    elementOffset.left >= viewportLeft &&
    elementOffset.left + elementOuterWidth <= viewportRight
  );
}

export const momentDefaultFormat = "D MMM YYYY";

export function dateFormat(date) {
  const days = [
    "domenica",
    "lunedì",
    "martedì",
    "mercoledì",
    "giovedì",
    "venerdì",
    "sabato",
  ];
  const months = [
    "gennaio",
    "febbraio",
    "marzo",
    "aprile",
    "maggio",
    "giugno",
    "luglio",
    "agosto",
    "settembre",
    "ottobre",
    "novembre",
    "dicembre",
  ];

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Mesi partono da 0
  const year = date.getFullYear();

  const formattedDate = `${days[date.getDay()]} ${day} ${
    months[date.getMonth()]
  } ${year}`;
  return formattedDate;
}

export function isConnectionSlow() {
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  if (connection) {

    console.log("Connection info:", connection);

    // downlink : velocità di connessione in Mbps
    const downlink = connection.downlink;
    if (downlink && downlink < 2.0) {
      return true;
    }

    // rtt : latenza in ms
    const rtt = connection.rtt;
    if (rtt && rtt > 250) {
      return true;
    }

    const effectiveType = connection.effectiveType;
    return (
      effectiveType === "slow-2g" ||
      effectiveType === "2g" ||
      effectiveType === "3g"
    );
  }

  return false;
}
