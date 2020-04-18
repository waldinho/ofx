import axios from 'axios';

export async function getRates(fromCurrency, toCurrency) {
    const response = await axios.get(`https://api.ofx.com/PublicSite.ApiService/OFX/spotrate/Individual/${fromCurrency}/${toCurrency}/10000?format=json`)
    return response.data
}