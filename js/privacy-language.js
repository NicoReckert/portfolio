import { de, en } from "./privacy-language-data.js";
import { privacyDom } from "./privacy-dom-elements.js";
import { getCurrentLanguage, setLanguage } from "./storage.js";

const languages = {
    de,
    en
};

/**
 * Initializes the privacy page language settings and registers language switch event listeners.
 * @returns {void}
 */
export function initPrivacyLanguage() {
    if (getCurrentLanguage() === "de") {
        setLanguageGerman();
    } else {
        setLanguageEnglish();
    }
    changePrivacyLanguage();
    privacyDom.germanButton.addEventListener("click", onGermanClick);
    privacyDom.englishButton.addEventListener("click", onEnglishClick);
}

/**
 * Updates the privacy page content based on the current language.
 * @returns {void}
 */
function changePrivacyLanguage() {
    const currentLanguage = getCurrentLanguage();
    const language = languages[currentLanguage];
    privacyDom.htmlRoot.lang = currentLanguage;
    privacyDom.pageTitle.textContent = language.pageTitle;
    privacyDom.privacyTitle.textContent = language.title;
    updatePrivacySectionTitles(language);
    privacyDom.privacySubtitle.textContent = language.subtitle;
    updatePrivacyTexts(language);
}

/**
 * Updates the privacy section titles based on the current language.
 * @param {Object} language - The language configuration.
 * @returns {void}
 */
function updatePrivacySectionTitles(language) {
    privacyDom.privacySectionTitles.forEach((title, index) => {
        if (language.sectionTitles[index]) {
            title.textContent = language.sectionTitles[index];
        }
    });
}

/**
 * Updates the privacy texts based on the current language.
 * @param {Object} language - The language configuration.
 * @returns {void}
 */
function updatePrivacyTexts(language) {
    privacyDom.privacyTexts.forEach((text, index) => {
        if (language.texts[index]) {
            text.innerHTML = language.texts[index];
        }
    });
}

/**
 * Activates the German language button and deactivates the English button.
 * @returns {void}
 */
function setLanguageGerman() {
    privacyDom.englishButton.classList.remove('header__language-button--active');
    privacyDom.germanButton.classList.add('header__language-button--active');
}

/**
 * Activates the English language button and deactivates the German button.
 * @returns {void}
 */
function setLanguageEnglish() {
    privacyDom.germanButton.classList.remove('header__language-button--active');
    privacyDom.englishButton.classList.add('header__language-button--active');
}

/**
 * Switches the privacy page language to German and updates the content.
 * @returns {void}
 */
function onGermanClick() {
    setLanguage("de");
    setLanguageGerman();
    changePrivacyLanguage();
}

/**
 * Switches the privacy page language to English and updates the content.
 * @returns {void}
 */
function onEnglishClick() {
    setLanguage("en");
    setLanguageEnglish();
    changePrivacyLanguage();
}