import axios from "axios";
import * as ReactDOM from "react-dom";

async function apiCall(newCoin, currencyType) {
    let coin = newCoin
    let currency = currencyType
    let baseURL = 'https://api.coingecko.com/api/v3/simple/price'
    try {
        let response = await axios.get(baseURL,
            { params: { ids: 'bitcoin', vs_currencies: 'usd'}})
        response = JSON.stringify(response)
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
export {apiCall}
