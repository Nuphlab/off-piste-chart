import axios from 'axios'
import moment from "moment";

//This grabs the price and time stamp from the numbers array for every hour
//in the past week.
//I've used a different service for this now, but will keep for the future.
export const formatSparkline = (numbers) => {
    const sevenDaysAgo = moment().subtract(7, 'days').unix()
    let formattedSparkline = numbers.map((item,index) => {
        return {
            x: sevenDaysAgo + (index + 1) * 3600,
            y: item
        }
    })
    return formattedSparkline
}

//Better for general data. I've kept this here for convenience for now.
//Will look into better services
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
    })
    return formattedData
}

//This pings the market data end point for coingecko
//And grabs a more robust set of data. Can work with multiple coins.
export const getMarketData = async (tokenName) => {
    const baseUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tokenName}&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d`
    try{
        const response = await axios.get(baseUrl)
        const data = response.data
        const formattedResponse = await formatMarketData(data)
        //console.log(formattedResponse)
        return formattedResponse
    } catch(e) {
        console.log(e)
    }
}

//A better service to call for a single coin when charting
//I only need to map some properties to the array for better functionality
export const getPriceAndTimestamp = async (coin, currencyType,days) => {
    const baseUrl = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currencyType}&days=${days}`
    try{
        const response = await axios.get(baseUrl)
        let responseArray = response.data.prices
        let newArray = []
        responseArray.forEach(p => {
            newArray.push({date: `${p[0]}`, price: `${p[1]}`})
        })
        return newArray
    }catch(e){
        console.log(e)
    }
}

/*
This pings the full list of coins, but needs to be modded to work better for
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
