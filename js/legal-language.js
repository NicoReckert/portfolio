import { de, en } from "./legal-language-data.js";
import { legalDom } from "./legal-dom-elements.js";
import { getCurrentLanguage, setLanguage } from "./storage.js";

const languages = {
    de,
    en
};

/**
 * Initializes the language settings and registers language switch event listeners.
 * @returns {void}
 */
export function initLegalLanguage() {
    if (getCurrentLanguage() === "de") {
        setLanguageGerman();
    } else {
        setLanguageEnglish();
    }
    changeLegalLanguage();
    legalDom.germanButton.addEventListener("click", onGermanClick);
    legalDom.englishButton.addEventListener("click", onEnglishClick);
}

/**
 * Updates the legal page content based on the current language.
 * @returns {void}
 */
function changeLegalLanguage() {
    const currentLanguage = getCurrentLanguage();
    const language = languages[currentLanguage];
    legalDom.htmlRoot.lang = currentLanguage;
    legalDom.pageTitle.textContent = language.pageTitle;
    legalDom.legalTitle.textContent = language.title;
    updateLegalSectionTitles(language);
    updateLegalTexts(language);
    updateLegalLinks(language);
}

/**
 * Updates the legal section titles based on the current language.
 * @param {Object} language - The language configuration.
 * @returns {void}
 */
function updateLegalSectionTitles(language) {
    legalDom.legalSectionTitles.forEach((title, index) => {
        if (language.sectionTitles[index]) {
            title.textContent = language.sectionTitles[index];
        }
    });
}

/**
 * Updates the legal texts based on the current language.
 * @param {Object} language - The language configuration.
 * @returns {void}
 */
function updateLegalTexts(language) {
    legalDom.legalTexts.forEach((text, index) => {
        if (language.texts[index]) {
            text.textContent = language.texts[index];
        }
    });
}

/**
 * Updates the legal links based on the current language.
 * @param {Object} language - The language configuration.
 * @returns {void}
 */
function updateLegalLinks(language) {
    legalDom.legalLinks.forEach((link, index) => {
        if (language.links[index]) {
            link.textContent = language.links[index];
        }
    });
}

/**
 * Activates the German language button and deactivates the English button.
 * @returns {void}
 */
function setLanguageGerman() {
    legalDom.englishButton.classList.remove('header__language-button--active');
    legalDom.germanButton.classList.add('header__language-button--active');
}

/**
 * Activates the English language button and deactivates the German button.
 * @returns {void}
 */
function setLanguageEnglish() {
    legalDom.germanButton.classList.remove('header__language-button--active');
    legalDom.englishButton.classList.add('header__language-button--active');
}

/**
 * Switches the legal page language to German and updates the content.
 * @returns {void}
 */
function onGermanClick() {
    setLanguage("de");
    setLanguageGerman();
    changeLegalLanguage();
}

/**
 * Switches the legal page language to English and updates the content.
 * @returns {void}
 */
function onEnglishClick() {
    setLanguage("en");
    setLanguageEnglish();
    changeLegalLanguage();
}