import axios from "axios";
import * as ReactDOM from "react-dom";

async function tokenList() {
    let baseUrl = 'https://api.coingecko.com/api/v3/coins/list'
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

async function apiCall(newCoin, currencyType) {
    let coin = newCoin || 'bitcoin'
    let currency = currencyType || 'usd'
    let baseURL = 'https://api.coingecko.com/api/v3/simple/price'
    try {
        let response = await axios.get(baseURL,
            { params: { ids: coin, vs_currencies: currency}})
        //response = JSON.stringify(response)
        //console.log(response)
        /*
        ReactDOM.render(
            <label>{response}</label>, document.getElementById('price')
        )
         */
        return response
    }catch (e) {
        console.log(e)
    }
}
export {apiCall, tokenList}
