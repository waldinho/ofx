import axios from 'axios';

export async function getRates(fromCurrency, toCurrency, amount) {
    const response = await axios.get(`https://api.ofx.com/PublicSite.ApiService/OFX/spotrate/Individual/${fromCurrency}/${toCurrency}/${amount}?format=json`)
    return response.data
}