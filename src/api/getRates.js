export const getRates = (fromCurrency, toCurrency) => {
    console.log('fromCurrency: ', fromCurrency)
    console.log('toCurrency: ', toCurrency)
    return fetch(`https://api.ofx.com/PublicSite.ApiService/OFX/spotrate/Individual/${fromCurrency}/${toCurrency}/10000?format=json`)
}