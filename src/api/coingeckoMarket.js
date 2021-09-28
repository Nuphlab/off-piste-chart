import axios from 'axios'
import moment from "moment";

//This grabs the price and time stamp from the numbers array for every hour
//in the past week.
export const formatSparkline = (numbers) => {
    console.log(numbers)
    const sevenDaysAgo = moment().subtract(7, 'days').unix()
    let formattedSparkline = numbers.map((item,index) => {
        return {
            x: sevenDaysAgo + (index + 1) * 3600,
            y: item
        }
    })
    //console.log('formatted sparkline')
    //console.log(formattedSparkline)
    return formattedSparkline
}

//This takes the raw market data from the 7d price array,
//then makes a new array, pairs the price array with exact date, then pushes
//the date/price for x&y coordinates. It preserves the original array of just prices.
export const formatMarketData = (data) => {
    let formattedData = []

    data.forEach( item => {
        const formattedSparkline = formatSparkline(item.sparkline_in_7d.price)
        //console.log('formattedSparkline check')
        //console.log(formattedSparkline)
        const formattedItem = {
            ...item,
            sparkline_in_7_d: {
                price: formattedSparkline
            }
        }
        formattedData.push(formattedItem)
        //console.log('formatted item')
        //console.log(formattedItem)
    })
    console.log('formatted data')
    console.log(formattedData)
    return formattedData
}

// This pings the market data end point for coingecko
export const getMarketData = async (tokenName) => {
    const baseUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tokenName}&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d`
    try{
        const response = await axios.get(baseUrl)
        const data = response.data
        const formattedResponse = await formatMarketData(data)
        console.log(formattedResponse)
        return formattedResponse
    } catch(e) {
        console.log(e)
    }
}

/*This pings the full list of coins, but needs to be modded to work better for
  autocomplete dropdown.
 */
export const fullTokenList = async () => {
    const baseUrl = 'https://api.coingecko.com/api/v3/coins/list?include_platform=false'
    try{
        let response = await axios.get(baseUrl, {"Access-Control-Allow-Origin": "*"})
        return response.data
    }catch (e) {
        console.log(e)
    }
}
