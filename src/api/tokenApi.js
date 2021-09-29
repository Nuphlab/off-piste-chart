import axios from "axios";

async function tokenList() {
    let baseUrl = 'https://api.coingecko.com/api/v3/coins/list'
    //let baseUrl = 'https://api.coingecko.com/api/v3/coins/markets'
    //vs_currency = usd
    //sparkline : yes, 7 day
    //price change percentage 7 day
    //cap list at 20 coins per page
    try {
        let response = await axios.get(baseUrl, {headers: {"Access-Control-Allow-Origin": "*"}})
        //response = JSON.stringify(response)
        //console.log(response)
        /*
        ReactDOM.render(
            <label>{response}</label>, document.getElementById('price')
        )
         */
        return response.data
    }catch (e) {
        console.log(e)
    }
}

async function coinDataRefresh(currCoin, currencyType) {
    let coin = currCoin || 'bitcoin'
    let currency = currencyType || 'usd'
    let baseURL = 'https://api.coingecko.com/api/v3/coins/bitcoin'
    try {
        let response = await axios.get(baseURL,
            { params: { ids: coin, vs_currencies: currency}})
        console.log(response.market_data)
        return response
    }catch (e) {
        console.log(e)
    }
}

async function getTokenInfo(newCoin) {
    let coin = newCoin || 'bitcoin'
    let baseURL = 'https://api.coingecko.com/api/v3/coins/'
    try {
        let response = await axios.get(`${baseURL}${coin}`)
        /*
        let response = await axios.get(baseURL,
            { params: { ids: coin, vs_currencies: currency}})
         */
        console.log(response)
        return response.data
    }catch (e) {
        console.log(e)
    }
}
export {getTokenInfo, tokenList, coinDataRefresh}
