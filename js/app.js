import { convertCurrencyARS, getCountryInfo } from "./api.js";

const fromInput = document.getElementById("fromValue");
const toInput = document.getElementById("toValue");
const convertBtn = document.getElementById("convertBtn");


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


// =============================
// PACKING CHECKLIST + localStorage
// =============================

const packingList = document.getElementById("packingList");
const newItemInput = document.getElementById("newItemInput");
const addItemBtn = document.getElementById("addItemBtn");

let checklistItems = JSON.parse(localStorage.getItem("packingChecklist")) || [
    { text: "Passport", checked: false },
    { text: "Phone Charger", checked: false },
    { text: "Clothes", checked: false }
];

function saveChecklist() {
    localStorage.setItem("packingChecklist", JSON.stringify(checklistItems));
}

function renderChecklist() {
    packingList.innerHTML = "";

    checklistItems.forEach((item, index) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.checked;

        checkbox.addEventListener("change", () => {
            checklistItems[index].checked = checkbox.checked;
            saveChecklist();
        });

        const label = document.createElement("span");
        label.textContent = item.text;

        li.appendChild(checkbox);
        li.appendChild(label);
        packingList.appendChild(li);
    });
}

addItemBtn.addEventListener("click", () => {
    const text = newItemInput.value.trim();
    if (text === "") return;

    checklistItems.push({ text, checked: false });
    newItemInput.value = "";
    saveChecklist();
    renderChecklist();
});

// Load checklist on page load
renderChecklist();

// =============================
// COUNTRY INFO FETCH EXAMPLE
// =============================
const countrySelect = document.getElementById("countrySelect");
const countryInfoDiv = document.getElementById("countryInfo");

countrySelect.addEventListener("change", async () => {
    const countryName = countrySelect.value;

    if (!countryName) {
        countryInfoDiv.innerHTML = "";
        return;
    }

    localStorage.setItem("selectedCountry", countryName);


    const country = await getCountryInfo(countryName);

    if (!country) {
        countryInfoDiv.innerHTML = "<p>Unable to load country info.</p>";
        return;
    }

    const languages = country.languages
        ? Object.values(country.languages).join(", ")
        : "N/A";

    const currencies = country.currencies
        ? Object.values(country.currencies)[0].name
        : "N/A";

    const emergency = country.idd?.root
        ? country.idd.root + (country.idd.suffixes?.[0] || "")
        : "N/A";

    countryInfoDiv.innerHTML = `
        <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="80">

        <p><strong>Country:</strong> ${country.name.common}</p>
        <p><strong>Languages:</strong> ${languages}</p>
        <p><strong>Currency:</strong> ${currencies}</p>
        <p><strong>Emergency Number:</strong> ${emergency}</p>
    `;
});

// Load selected country from localStorage
const savedCountry = localStorage.getItem("selectedCountry");

if (savedCountry) {
    countrySelect.value = savedCountry;
    countrySelect.dispatchEvent(new Event("change"));
}


// =============================
// SAVED TRIPS - WEEK 7 (DESKTOP + MOBILE)
// =============================

function saveTrip() {
    const selectedCountry = localStorage.getItem("selectedCountry");
    const checklist = JSON.parse(localStorage.getItem("packingChecklist")) || [];

    if (!selectedCountry) {
        alert("Please select a country before saving the trip.");
        return;
    }

    const newTrip = {
        country: selectedCountry,
        checklist: checklist,
        date: new Date().toLocaleDateString()
    };

    const savedTrips = JSON.parse(localStorage.getItem("savedTrips")) || [];
    savedTrips.push(newTrip);

    localStorage.setItem("savedTrips", JSON.stringify(savedTrips));

    alert("Trip saved successfully!");
}

// Desktop button
document.getElementById("saveTripBtn")
    .addEventListener("click", saveTrip);

// Mobile button
document.getElementById("saveTripBtnMobile")
    .addEventListener("click", saveTrip);

// ============================
// VIEW SAVED TRIPS
// ============================

const savedTripsBtn = document.getElementById("savedTripsBtn");
const savedTripsBtnMobile = document.getElementById("savedTripsBtnMobile");
const savedTripsSection = document.getElementById("savedTripsSection");
const savedTripsList = document.getElementById("savedTripsList");

function showSavedTrips() {
    const trips = JSON.parse(localStorage.getItem("savedTrips")) || [];
    savedTripsList.innerHTML = "";

    if (trips.length === 0) {
        savedTripsList.innerHTML = "<p>No saved trips yet.</p>";
    }

    trips.forEach((trip, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p><strong>Country:</strong> ${trip.country}</p>
            <p><strong>Date:</strong> ${trip.date}</p>
            <hr>
        `;
        savedTripsList.appendChild(div);
    });

    savedTripsSection.style.display = "block";
}

// Desktop
savedTripsBtn.addEventListener("click", showSavedTrips);

// Mobile
savedTripsBtnMobile.addEventListener("click", showSavedTrips);

