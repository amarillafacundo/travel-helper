const EXCHANGE_API = "https://api.exchangerate-api.com/v4/latest/ARS";

export async function convertCurrencyARS(amount) {
    try {
        const res = await fetch(EXCHANGE_API);
        const data = await res.json();
        return amount * data.rates.EUR;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function getCountryInfo(countryName) {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await res.json();
        return data[0];
    } catch (error) {
        console.error("Country API error:", error);
        return null;
    }
}
