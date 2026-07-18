import { de, en } from "./language-data.js";
import { dom } from "./dom-elements.js";
import { getCurrentLanguage, setLanguage } from "./storage.js";
import { refreshReference } from "./references.js";

const languages = {
    de,
    en
};

export function initLanguage() {
    if (getCurrentLanguage() === "de") {
        setLanguageGerman();
    } else {
        setLanguageEnglish();
    }
    changeLanguage();
    refreshReference();

    dom.germanButton.addEventListener("click", onGermanClick);
    dom.englishButton.addEventListener("click", onEnglishClick);
}

function changeLanguage() {
    const language = languages[getCurrentLanguage()];
    dom.headerLinks.forEach((link, index) => {
        if (language.header.links[index]) {
            link.textContent = language.header.links[index];
        }
    });
    dom.heroIntro.textContent = language.hero.intro;
    dom.heroRole.textContent = language.hero.role;
    dom.heroButton.textContent = language.hero.button;
    dom.heroScrollText.textContent = language.hero.scrollText;
    dom.aboutTitle.textContent = language.about.title;
    dom.aboutIntroduction.textContent = language.about.introduction;
    dom.aboutLocation.textContent = language.about.location;
    dom.aboutLearning.textContent = language.about.learning;
    dom.aboutProblemSolving.textContent = language.about.problemSolving;
    dom.skillsTitle.textContent = language.skills.title;
    dom.skillsHighlight.textContent = language.skills.highlight;
    dom.skillsHighlightAccent.textContent = language.skills.highlightAccent;
    dom.skillsText.textContent = language.skills.text;
    dom.skillsButton.textContent = language.skills.button;
}

function setLanguageGerman() {
    dom.englishButton.classList.remove('header__language-button--active');
    dom.germanButton.classList.add('header__language-button--active');
}

function setLanguageEnglish() {
    dom.germanButton.classList.remove('header__language-button--active');
    dom.englishButton.classList.add('header__language-button--active');
}

function onGermanClick() {
    setLanguage("de");
    setLanguageGerman();
    changeLanguage();
    refreshReference();
}

function onEnglishClick() {
    setLanguage("en");
    setLanguageEnglish();
    changeLanguage();
    refreshReference();
}