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
    const currentLanguage = getCurrentLanguage();
    const language = languages[currentLanguage];
    dom.htmlRoot.lang = currentLanguage;
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
    dom.portfolioText.textContent = language.portfolio.text;
    dom.portfolioDescriptions.forEach((description, index) => {
        if (language.portfolio.projectDescription[index]) {
            description.textContent = language.portfolio.projectDescription[index];
        }
    });
    dom.contactTitle.textContent = language.contact.title;
    dom.contactSubtitle.textContent = language.contact.subtitle;
    dom.contactTexts.forEach((text, index) => {
        if (language.contact.text[index]) {
            text.textContent = language.contact.text[index];
        }
    });
    dom.contactName.placeholder = language.contact.name;
    dom.contactErrorName.textContent = language.contact.errorName;
    dom.contactEmail.placeholder = language.contact.email;
    dom.contactErrorEmailRequired.textContent = language.contact.errorEmailRequired;
    dom.contactErrorEmailFormat.textContent = language.contact.errorEmailFormat;
    dom.contactMessage.placeholder = language.contact.message;
    dom.contactErrorMessage.textContent = language.contact.errorMessage;
    dom.contactPrivacyTexts.forEach((text, index) => {
        if (language.contact.privacyText[index]) {
            text.textContent = language.contact.privacyText[index];
        }
    });
    dom.contactPrivacyLink.textContent = language.contact.privacyLink;
    dom.contactErrorPolicy.textContent = language.contact.errorPolicy;
    dom.contactSubmitButton.textContent = language.contact.button;
    dom.footerLegalLink.textContent = language.footer.legalLink;
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