export const dom = {
    htmlRoot: document.documentElement,
    headerLinks: Array.from(document.querySelectorAll('.header__link')),
    headerMenuButton: document.getElementById('header-menu-button'),
    germanButton: document.getElementById('german-button'),
    englishButton: document.getElementById('english-button'),
    heroIntro: document.getElementById('hero-intro'),
    heroRole: document.getElementById('hero-role'),
    heroButton: document.getElementById('hero-button'),
    heroScrollText: document.getElementById('hero-scroll-text'),
    aboutTitle: document.getElementById('about-title'),
    aboutIntroduction: document.getElementById('about-introduction'),
    aboutLocation: document.getElementById('about-location'),
    aboutLearning: document.getElementById('about-learning'),
    aboutProblemSolving: document.getElementById('about-problem-solving'),
    skillsTitle: document.getElementById('skills-title'),
    skillsHighlight: document.getElementById('skills-highlight'),
    skillsHighlightAccent: document.getElementById('skills-highlight-accent'),
    skillsText: document.getElementById('skills-text'),
    skillsButton: document.getElementById('skills-button'),
    portfolioText: document.getElementById('portfolio-text'),
    portfolioDescriptions: Array.from(document.querySelectorAll('.portfolio__project-description')),
    referencesPrev: document.getElementById('references-prev'),
    referencesNext: document.getElementById('references-next'),
    referencesQuote: document.getElementById('references-quote'),
    referencesAuthor: document.getElementById('references-author'),
    referencesImage: document.getElementById('references-image'),
    referencesDots: Array.from(document.querySelectorAll('.references__dot')),
    contactTitle: document.getElementById('contact-title'),
    contactSubtitle: document.getElementById('contact-subtitle'),
    contactTexts: Array.from(document.querySelectorAll('.contact__text')),
    contactName: document.getElementById('contact-name'),
    contactErrorName: document.getElementById('contact-error-name'),
    contactEmail: document.getElementById('contact-email'),
    contactErrorEmailRequired: document.getElementById('contact-error-email-required'),
    contactErrorEmailFormat: document.getElementById('contact-error-email-format'),
    contactMessage: document.getElementById('contact-message'),
    contactErrorMessage: document.getElementById('contact-error-message'),
    contactPrivacyTexts: Array.from(document.querySelectorAll('.contact__privacy-text')),
    contactPrivacyLink: document.getElementById('contact-privacy-link'),
    contactErrorPolicy: document.getElementById('contact-error-policy'),
    contactSubmitButton: document.getElementById('submit-button'),
    footerLegalLink: document.getElementById('footer-legal-link'),
    mobileOverlay: document.getElementById('mobile-overlay'),
    mobileOverlayLinks: Array.from(document.querySelectorAll('.mobile__overlay-link')),
    mobileOverlayEnglishButton: document.getElementById('overlay-english-button'),
    mobileOverlayGermanButton: document.getElementById('overlay-german-button')
}

/**
 * Initializes navigation event listeners and resets active link states.
 * @returns {void}
 */
export function initDom() {
    dom.headerLinks.forEach(link => {
        link.classList.remove('header__link--active');
        link.addEventListener('click', setActiveHeaderLink);
    });
    dom.headerMenuButton.addEventListener('click', slideInMobileMenu);
    dom.mobileOverlayLinks.forEach(link => {
        link.classList.remove('mobile__overlay-link--active');
        link.addEventListener('click', event => {
            setActiveMobileLink(event);
            slideBackMobileMenu();
        });
    });
}

/**
 * Activates the corresponding header and mobile links.
 * @param {Event} event - The click event.
 * @returns {void}
 */
function setActiveHeaderLink(event) {
    const index = dom.headerLinks.indexOf(event.currentTarget);
    setActiveHeaderLinkByIndex(index);
    setActiveMobileLinkByIndex(index);
}

/**
 * Activates the header link at the specified index.
 * @param {number} index - The index of the header link.
 * @returns {void}
 */
function setActiveHeaderLinkByIndex(index) {
    dom.headerLinks.forEach(link => {
        link.classList.remove('header__link--active');
    });
    dom.headerLinks[index]?.classList.add('header__link--active');
}

/**
 * Activates the corresponding mobile and header links.
 * @param {Event} event - The click event.
 * @returns {void}
 */
function setActiveMobileLink(event) {
    const index = dom.mobileOverlayLinks.indexOf(event.currentTarget);
    setActiveMobileLinkByIndex(index);
    setActiveHeaderLinkByIndex(index);
}

/**
 * Activates the mobile link at the specified index.
 * @param {number} index - The index of the mobile link.
 * @returns {void}
 */
function setActiveMobileLinkByIndex(index) {
    dom.mobileOverlayLinks.forEach(link => {
        link.classList.remove('mobile__overlay-link--active');
    });
    dom.mobileOverlayLinks[index]?.classList.add('mobile__overlay-link--active');
}

/**
 * Toggles the mobile menu and updates the menu button state.
 * @returns {void}
 */
function slideInMobileMenu() {
    const isOpen = dom.mobileOverlay.classList.toggle('mobile__overlay--active');
    dom.headerMenuButton.classList.toggle('header__menu-button--active', isOpen);
}

/**
 * Closes the mobile menu and resets the menu button state.
 * @returns {void}
 */
function slideBackMobileMenu() {
    dom.mobileOverlay.classList.remove('mobile__overlay--active');
    dom.headerMenuButton.classList.remove('header__menu-button--active');
}