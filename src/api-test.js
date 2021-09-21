import axios from "axios";
import * as ReactDOM from "react-dom";

async function apiCall() {
    let baseURL = 'https://api.coingecko.com/api/v3/simple/price'
    try {
        let response = await axios.get(baseURL,
            { params: { ids: 'bitcoin', vs_currencies: 'usd'}})
        response = JSON.stringify(response.data.bitcoin.usd)
        console.log(response)
        ReactDOM.render(
            <label>{response}</label>, document.getElementById('price')
        )

    }catch (e) {
        console.log(e)
    }
}
export {apiCall}
