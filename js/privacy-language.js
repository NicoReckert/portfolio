import { de, en } from "./privacy-language-data.js";
import { privacyDom } from "./privacy-dom-elements.js";
import { getCurrentLanguage, setLanguage } from "./storage.js";

const languages = {
    de,
    en
};

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

function changePrivacyLanguage() {
    const currentLanguage = getCurrentLanguage();
    const language = languages[currentLanguage];
    privacyDom.htmlRoot.lang = currentLanguage;
    privacyDom.pageTitle.textContent = language.pageTitle;
    privacyDom.privacyTitle.textContent = language.title;
    privacyDom.privacySectionTitles.forEach((title, index) => {
        if (language.sectionTitles[index]) {
            title.textContent = language.sectionTitles[index];
        }
    });
    privacyDom.privacySubtitle.textContent = language.subtitle;
    privacyDom.privacyTexts.forEach((text, index) => {
        if (language.texts[index]) {
            text.innerHTML = language.texts[index];
        }
    });
}

function setLanguageGerman() {
    privacyDom.englishButton.classList.remove('header__language-button--active');
    privacyDom.germanButton.classList.add('header__language-button--active');
}

function setLanguageEnglish() {
    privacyDom.germanButton.classList.remove('header__language-button--active');
    privacyDom.englishButton.classList.add('header__language-button--active');
}

function onGermanClick() {
    setLanguage("de");
    setLanguageGerman();
    changePrivacyLanguage();
}

function onEnglishClick() {
    setLanguage("en");
    setLanguageEnglish();
    changePrivacyLanguage();
}