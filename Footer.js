document.addEventListener("DOMContentLoaded", function () {
    // Elemente auswählen
    const popup = document.getElementById("email-popup");
    const emailText = document.getElementById("email-text");
    const showPopupButton = document.getElementById("show-popup");
    const closePopupButton = document.getElementById("close-popup");

    // Popup anzeigen, wenn der Link geklickt wird
    showPopupButton.addEventListener("click", function (event) {
        event.preventDefault(); // Standard-Link-Verhalten verhindern
        popup.style.display = "flex"; // Popup sichtbar machen
    });

    // Popup schließen
    closePopupButton.addEventListener("click", function () {
        popup.style.display = "none"; // Popup verstecken
    });

    // E-Mail-Adresse kopieren
    emailText.addEventListener("click", function () {
        const email = emailText.textContent;
        navigator.clipboard
            .writeText(email)
            .then(() => {
                alert("E-Mail-Adresse kopiert: " + email);
            })
            .catch((error) => {
                console.error("Fehler beim Kopieren der E-Mail-Adresse: ", error);
            });
    });
});