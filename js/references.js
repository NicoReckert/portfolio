import { references } from "./reference-data.js";
import { dom } from "./dom-elements.js";
import { getCurrentLanguage } from "./storage.js";

let currentReference = 0;

/**
 * Updates the displayed reference based on the selected index and current language.
 * @param {number} index - The index of the selected reference.
 * @returns {void}
 */
function setReference(index) {
    currentReference = index;
    const reference = references[getCurrentLanguage()][currentReference];
    dom.referencesQuote.textContent = reference.text;
    dom.referencesAuthor.textContent = reference.author;
    dom.referencesImage.src = reference.portraitSrc;
    updateDots();
}

/**
 * Advances to the next reference and wraps around to the first if necessary.
 * @returns {void}
 */
function nextReference() {
    const language = getCurrentLanguage();
    currentReference++;
    if (currentReference >= references[language].length) {
        currentReference = 0;
    }
    setReference(currentReference);
}

/**
 * Moves to the previous reference and wraps around to the last if necessary.
 * @returns {void}
 */
function prevReference() {
    const language = getCurrentLanguage();
    currentReference--;
    if (currentReference < 0) {
        currentReference = references[language].length - 1;
    }
    setReference(currentReference);
}

/**
 * Updates the active state of the reference navigation dots.
 * @returns {void}
 */
function updateDots() {
    dom.referencesDots.forEach((dot, index) => {
        dot.classList.toggle(
            "references__dot-active",
            index === currentReference
        );
    });
}

/**
 * Registers click event listeners for the reference navigation dots.
 * @returns {void}
 */
dom.referencesDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        setReference(index);
    });
});

/**
 * Refreshes the currently displayed reference.
 * @returns {void}
 */
export function refreshReference() {
    setReference(currentReference);
}

/**
 * Registers a click event listener to display the next reference.
 * @returns {void}
 */
dom.referencesNext.addEventListener("click", nextReference);

/**
 * Registers a click event listener to display the previous reference.
 * @returns {void}
 */
dom.referencesPrev.addEventListener("click", prevReference);