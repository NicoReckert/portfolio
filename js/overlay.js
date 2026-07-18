const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayMessage = document.getElementById("overlay-message");

export function showOverlay(title, message) {
    overlayTitle.textContent = title;
    overlayMessage.textContent = message;
    overlay.classList.remove("d-none");
    setTimeout(() => {
        overlay.classList.add("d-none");
    }, 2500);
}