const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayMessage = document.getElementById("overlay-message");

/**
 * Displays an overlay with a title and message, then hides it after a delay.
 * @param {string} title - The overlay title.
 * @param {string} message - The overlay message.
 * @returns {void}
 */
export function showOverlay(title, message) {
    overlayTitle.textContent = title;
    overlayMessage.textContent = message;
    overlay.classList.remove("d-none");
    setTimeout(() => {
        overlay.classList.add("d-none");
    }, 2500);
}