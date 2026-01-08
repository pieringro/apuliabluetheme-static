export function animateMain(jquery) {
  $ = jquery;

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };

  let observer = new IntersectionObserver(elementInViewCallback, options);

  const animatedElements = $(".animated");

  for (let i = 0; i < animatedElements.length; i++) {
    // console.log(animatedElements[i]);
    observer.observe(animatedElements[i]);
  }

  const $targetElement = $("#typewriter-text");
  const originalHtmlContent = $("#hidden-typewriter-content").html();
  if ($targetElement && originalHtmlContent) {
    animateTextIndex0($targetElement, originalHtmlContent);
  }
}

function elementInViewCallback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (!entry.target.classList.contains("start")) {
        entry.target.classList.add("start");
      }
    } else {
      // entry.target.classList.remove("start");
    }
  });
}

function animateTextIndex0($targetElement, originalHtmlContent) {
  const typingSpeed = 1000; // Millisecondi tra l'apparizione di un pezzo e l'altro
  let charIndex = 0;
  let $cursorElement = null;
  const mobileBreakpoint = 768;

  const brRegex = /(<br\s*\/?>)/gi;

  let contentPieces = originalHtmlContent.split(brRegex);
  contentPieces = contentPieces.filter((piece) => piece.trim() !== "<br>");

  function displayAllText() {
    const cleanedHtmlContent = originalHtmlContent.replace(/<br\s*\/?>/gi, "");
    $targetElement.html(cleanedHtmlContent);
    $targetElement.css("visibility", "visible");
  }

  function typeWriter() {
    if (charIndex < contentPieces.length) {
      $targetElement.css("visibility", "visible");

      if ($cursorElement) {
        $cursorElement.remove();
      }

      const currentPiece =
        contentPieces[charIndex].replace("\n", "").trim() + "<br>";
      let $pieceElement;

      $pieceElement = $("<span>")
        .addClass("typewriter-word")
        .html(currentPiece);

      $targetElement.append($pieceElement);
      setTimeout(function () {
        $pieceElement.css("opacity", 1);
      }, 100);

      charIndex++;

      $cursorElement = $("<span>").addClass("typewriter-cursor");
      $targetElement.append($cursorElement);

      setTimeout(typeWriter, typingSpeed);
    } else {
      // Quando la scrittura è completata
      if ($cursorElement) {
        $cursorElement.css("opacity", "1").css("animation", "none");
      }
    }
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // L'elemento è visibile e l'animazione non è ancora partita

            // se da mobile l'animazione è disattivata, mostra tutto il testo
            if ($(window).width() <= mobileBreakpoint) {
              displayAllText();
            } else {
              setTimeout(() => {
                typeWriter();
              }, 800);
            }
            observer.unobserve(entry.target); // Ferma l'osservatore una volta che l'animazione è partita
          }
        });
      },
      {
        rootMargin: "0px", // Inizia quando anche una piccola parte dell'elemento è visibile
        threshold: 0.1, // L'elemento è considerato visibile quando almeno il 10% è nel viewport
      }
    );

    observer.observe($targetElement[0]);
  }

  let isAnimating = false; // Flag per evitare animazioni multiple
  $(window).resize(function () {
    // Se la larghezza cambia e incrocia il breakpoint
    if ($(window).width() <= mobileBreakpoint && !isAnimating) {
      // Se era in animazione e ora è piccolo
      clearTimeout(window.typewriterTimeout); // Ferma qualsiasi animazione in corso
      displayAllText();
    } else if ($(window).width() > mobileBreakpoint && isAnimating) {
      // Se era non in animazione e ora è grande (e vuoi riavviare l'animazione)
      // Questo richiede un reset completo dello stato, quindi potrebbe essere più complesso.
      // Per semplicità, qui riavviamo solo se non era animando e ora è grande.
      // Per un reset completo, dovresti ricaricare la pagina o reimpostare currentIndex = 0 ecc.
      // e chiamare animateNextPiece().
    }
  });
}
