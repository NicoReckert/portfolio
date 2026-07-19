import { de, en } from "./legal-language-data.js";
import { legalDom } from "./legal-dom-elements.js";
import { getCurrentLanguage, setLanguage } from "./storage.js";

const languages = {
    de,
    en
};

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

function changeLegalLanguage() {
    const currentLanguage = getCurrentLanguage();
    const language = languages[currentLanguage];
    legalDom.htmlRoot.lang = currentLanguage;
    legalDom.pageTitle.textContent = language.pageTitle;
    legalDom.legalTitle.textContent = language.title;
    legalDom.legalSectionTitles.forEach((title, index) => {
        if (language.sectionTitles[index]) {
            title.textContent = language.sectionTitles[index];
        }
    });
    legalDom.legalTexts.forEach((text, index) => {
        if (language.texts[index]) {
            text.textContent = language.texts[index];
        }
    });
    legalDom.legalLinks.forEach((link, index) => {
        if (language.links[index]) {
            link.textContent = language.links[index];
        }
    });
}

function setLanguageGerman() {
    legalDom.englishButton.classList.remove('header__language-button--active');
    legalDom.germanButton.classList.add('header__language-button--active');
}

function setLanguageEnglish() {
    legalDom.germanButton.classList.remove('header__language-button--active');
    legalDom.englishButton.classList.add('header__language-button--active');
}

function onGermanClick() {
    setLanguage("de");
    setLanguageGerman();
    changeLegalLanguage();
}

function onEnglishClick() {
    setLanguage("en");
    setLanguageEnglish();
    changeLegalLanguage();
}