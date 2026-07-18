import { references } from "./reference-data.js";
import { dom } from "./dom-elements.js";
import { getCurrentLanguage } from "./storage.js";

let currentReference = 0;

function setReference(index) {
    currentReference = index;
    const reference = references[getCurrentLanguage()][currentReference];

    dom.referencesQuote.textContent = reference.text;
    dom.referencesAuthor.textContent = reference.author;
    dom.referencesImage.src = reference.portraitSrc;

    updateDots();
}

function nextReference() {
    const language = getCurrentLanguage();
    currentReference++;

    if (currentReference >= references[language].length) {
        currentReference = 0;
    }

    setReference(currentReference);
}

function prevReference() {
    const language = getCurrentLanguage();
    currentReference--;

    if (currentReference < 0) {
        currentReference = references[language].length - 1;
    }

    setReference(currentReference);
}

function updateDots() {
    dom.referencesDots.forEach((dot, index) => {
        dot.classList.toggle(
            "references__dot-active",
            index === currentReference
        );
    });
}

dom.referencesDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        setReference(index);
    });
});

export function refreshReference() {
    setReference(currentReference);
}

dom.referencesNext.addEventListener("click", nextReference);
dom.referencesPrev.addEventListener("click", prevReference);