import { PerformanceAdaptation } from "./performance-adaptation.js";

export function headerMain(jquery) {
  $ = jquery;
  handleAnimatedTitle();
  const performanceAdaptation = new PerformanceAdaptation($);
  performanceAdaptation.init();
}
const delayAnimationTitle = 0.7;

function handleAnimatedTitle() {
  let stepIndex = 0;

  stepIndex = animateText(".pre-title", "animated-words", " ", stepIndex);
  stepIndex = animateText(".title h1", "animated-words", " ", stepIndex);
  stepIndex = animateText(
    ".subtitle h2",
    "animated-sentences",
    "\n",
    stepIndex
  );
  // stepIndex = animateButton(".btn-reserve", "animated-button", stepIndex);
}

function animateText(selector, className, splitChar, stepIndex = 0) {
  const element = document.querySelector(selector);

  if (element) {
    const text = element.textContent.trim();
    const parts = text.split(splitChar);

    element.innerHTML = "";
    const spanList = [];
    element.style.opacity = 1;
    parts.forEach((part) => {
      const span = document.createElement("span");
      span.classList.add(className);
      span.style.animationDelay = `${delayAnimationTitle + stepIndex / 1.5}s`;
      span.textContent = part + splitChar;
      span.style.opacity = 0;
      element.appendChild(span);
      element.appendChild(document.createTextNode(" "));
      spanList.push(span);
      stepIndex++;
    });
  } else {
    console.warn(`Element with selector "${selector}" not found.`);
  }

  return stepIndex;
}

// function animateButton(selector, className, stepIndex) {
//   const element = document.querySelector(selector);
//   element.style.opacity = 1;
//   const button = element.firstElementChild;
//   button.classList.add(className);
//   button.style.animationDelay = `${delayAnimationTitle + stepIndex / 1.5}s`;
//   button.style.opacity = 0;
//   stepIndex++;
// }
