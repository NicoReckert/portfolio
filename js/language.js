import { de, en } from "./language-data.js";
import { dom } from "./dom-elements.js";
import { getCurrentLanguage, setLanguage } from "./storage.js";
import { refreshReference } from "./references.js";

const languages = {
    de,
    en
};

/**
 * Initializes the language settings and registers language switch event listeners.
 * @returns {void}
 */
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
    dom.mobileOverlayGermanButton.addEventListener('click', onGermanClick);
    dom.mobileOverlayEnglishButton.addEventListener('click', onEnglishClick);
}

/**
 * Updates all page content based on the current language.
 * @returns {void}
 */
function changeLanguage() {
    const currentLanguage = getCurrentLanguage();
    const language = languages[currentLanguage];
    updateMobileLanguageButtons();
    dom.htmlRoot.lang = currentLanguage;
    updateHeaderLanguage(language);
    updateMobileMenuLanguage(language);
    updateHeroLanguage(language);
    updateAboutLanguage(language);
    updateSkillsLanguage(language);
    updatePortfolioLanguage(language);
    updateContactLanguage(language);
    updateFooterLanguage(language);
}

/**
 * Updates the header links based on the current language.
 * @param {Object} language - The language configuration.
 * @returns {void}
 */
function updateHeaderLanguage(language) {
    dom.headerLinks.forEach((link, index) => {
        if (language.header.links[index]) {
            link.textContent = language.header.links[index];
        }
    });
}

/**
 * Updates the mobile menu links based on the current language.
 * @param {Object} language - The language configuration.
 * @returns {void}
 */
function updateMobileMenuLanguage(language) {
    dom.mobileOverlayLinks.forEach((link, index) => {
        if (language.header.links[index]) {
            link.textContent = language.header.links[index];
        }
    });
}

/**
 * Updates the hero section content based on the current language.
 * @param {Object} language - The language configuration.
 * @returns {void}
 */
function updateHeroLanguage(language) {
    dom.heroIntro.textContent = language.hero.intro;
    dom.heroRole.textContent = language.hero.role;
    dom.heroButton.textContent = language.hero.button;
    dom.heroScrollText.textContent = language.hero.scrollText;
}

/**
 * Updates the about section content based on the current language.
 * @param {Object} language - The language configuration.
 * @returns {void}
 */
function updateAboutLanguage(language) {
    dom.aboutTitle.textContent = language.about.title;
    dom.aboutIntroduction.textContent = language.about.introduction;
    dom.aboutLocation.textContent = language.about.location;
    dom.aboutLearning.textContent = language.about.learning;
    dom.aboutProblemSolving.textContent = language.about.problemSolving;
}

/**
 * Updates the skills section content based on the current language.
 * @param {Object} language - The language configuration.
 * @returns {void}
 */
function updateSkillsLanguage(language) {
    dom.skillsTitle.textContent = language.skills.title;
    dom.skillsHighlight.textContent = language.skills.highlight;
    dom.skillsHighlightAccent.textContent = language.skills.highlightAccent;
    dom.skillsText.textContent = language.skills.text;
    dom.skillsButton.textContent = language.skills.button;
}

/**
 * Updates the portfolio section content based on the current language.
 * @param {Object} language - The language configuration.
 * @returns {void}
 */
function updatePortfolioLanguage(language) {
    dom.portfolioText.textContent = language.portfolio.text;
    dom.portfolioDescriptions.forEach((description, index) => {
        if (language.portfolio.projectDescription[index]) {
            description.textContent = language.portfolio.projectDescription[index];
        }
    });
}

/**
 * Updates the contact section content based on the current language.
 * @param {Object} language - The language configuration.
 * @returns {void}
 */
function updateContactLanguage(language) {
    updateContactTexts(language);
    updateContactFields(language);
    updateContactPrivacy(language);
}

/**
 * Updates the contact section texts based on the current language.
 * @param {Object} language - The language configuration.
 * @returns {void}
 */
function updateContactTexts(language) {
    dom.contactTitle.textContent = language.contact.title;
    dom.contactSubtitle.textContent = language.contact.subtitle;
    dom.contactTexts.forEach((text, index) => {
        if (language.contact.text[index]) {
            text.textContent = language.contact.text[index];
        }
    });
}

/**
 * Updates the contact form fields and error messages based on the current language.
 * @param {Object} language - The language configuration.
 * @returns {void}
 */
function updateContactFields(language) {
    dom.contactName.placeholder = language.contact.name;
    dom.contactErrorName.textContent = language.contact.errorName;
    dom.contactEmail.placeholder = language.contact.email;
    dom.contactErrorEmailRequired.textContent = language.contact.errorEmailRequired;
    dom.contactErrorEmailFormat.textContent = language.contact.errorEmailFormat;
    dom.contactMessage.placeholder = language.contact.message;
    dom.contactErrorMessage.textContent = language.contact.errorMessage;
    dom.contactErrorPolicy.textContent = language.contact.errorPolicy;
    dom.contactSubmitButton.textContent = language.contact.button;
}

/**
 * Updates the contact privacy text and link based on the current language.
 * @param {Object} language - The language configuration.
 * @returns {void}
 */
function updateContactPrivacy(language) {
    dom.contactPrivacyTexts.forEach((text, index) => {
        if (language.contact.privacyText[index]) {
            text.textContent = language.contact.privacyText[index];
        }
    });
    dom.contactPrivacyLink.textContent = language.contact.privacyLink;
}

/**
 * Updates the footer link based on the current language.
 * @param {Object} language - The language configuration.
 * @returns {void}
 */
function updateFooterLanguage(language) {
    dom.footerLegalLink.textContent = language.footer.legalLink;
}

/**
 * Activates the German language button and deactivates the English button.
 * @returns {void}
 */
function setLanguageGerman() {
    dom.englishButton.classList.remove('header__language-button--active');
    dom.germanButton.classList.add('header__language-button--active');
}

/**
 * Activates the English language button and deactivates the German button.
 * @returns {void}
 */
function setLanguageEnglish() {
    dom.germanButton.classList.remove('header__language-button--active');
    dom.englishButton.classList.add('header__language-button--active');
}

/**
 * Updates the active state of the mobile language buttons.
 * @returns {void}
 */
function updateMobileLanguageButtons() {
    const currentLanguage = getCurrentLanguage();
    resetMobileLanguageButtons();
    setActiveMobileLanguageButton(currentLanguage);
}

/**
 * Removes the active state from both mobile language buttons.
 * @returns {void}
 */
function resetMobileLanguageButtons() {
    const activeClass = 'mobile__overlay-language-button--active';
    dom.mobileOverlayEnglishButton.classList.remove(activeClass);
    dom.mobileOverlayGermanButton.classList.remove(activeClass);
}

/**
 * Activates the mobile language button for the selected language.
 * @param {string} language - The selected language code.
 * @returns {void}
 */
function setActiveMobileLanguageButton(language) {
    const activeClass = 'mobile__overlay-language-button--active';
    if (language === 'en') {
        dom.mobileOverlayEnglishButton.classList.add(activeClass);
    } else if (language === 'de') {
        dom.mobileOverlayGermanButton.classList.add(activeClass);
    }
}

/**
 * Switches the interface language to German and updates the content.
 * @returns {void}
 */
function onGermanClick() {
    setLanguage("de");
    setLanguageGerman();
    changeLanguage();
    refreshReference();
}

/**
 * Switches the interface language to English and updates the content.
 * @returns {void}
 */
function onEnglishClick() {
    setLanguage("en");
    setLanguageEnglish();
    changeLanguage();
    refreshReference();
}