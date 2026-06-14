function setLanguageGerman() {
    document.getElementById('englishButton').classList.remove('header__language-button--active');
    document.getElementById('germanButton').classList.add('header__language-button--active');
}

function setLanguageEnglish() {
    document.getElementById('germanButton').classList.remove('header__language-button--active');
    document.getElementById('englishButton').classList.add('header__language-button--active');
}