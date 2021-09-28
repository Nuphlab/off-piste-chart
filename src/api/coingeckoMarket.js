import axios from 'axios'
import moment from "moment";

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

export const fullTokenList = async () => {
    const baseUrl = 'https://api.coingecko.com/api/v3/coins/list?include_platform=false'
    try{
        let response = await axios.get(baseUrl, {"Access-Control-Allow-Origin": "*"})
        return response.data
    }catch (e) {
        console.log(e)
    }
}
