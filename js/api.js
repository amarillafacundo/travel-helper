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

