import { convertCurrencyARS } from "./api.js";

const fromInput = document.getElementById("fromValue");
const toInput = document.getElementById("toValue");
const convertBtn = document.getElementById("convertBtn");

// MOBILE BUTTONS
document.getElementById("savedTripsBtnMobile").addEventListener("click", () => {
    alert("Saved Trips coming in Week 6!");
});
document.getElementById("saveTripBtnMobile").addEventListener("click", () => {
    alert("Save Trip coming in Week 6!");
});

// DESKTOP BUTTON
document.getElementById("savedTripsBtn").addEventListener("click", () => {
    alert("Saved Trips coming in Week 6!");
});

convertBtn.addEventListener("click", async () => {
    const amount = parseFloat(fromInput.value);

    if (isNaN(amount) || amount <= 0) {
        alert("Enter a valid ARS amount.");
        return;
    }

    const result = await convertCurrencyARS(amount);
    if (result !== null) {
        toInput.value = result.toFixed(2) + " EUR";
    }
});

// =============================
// FOOTER - YEAR & LAST MODIFIED
// =============================

const yearSpan = document.getElementById("currentyear");
const lastModifiedP = document.getElementById("lastModified");

yearSpan.textContent = new Date().getFullYear();
lastModifiedP.textContent = "Last Modified: " + document.lastModified;
