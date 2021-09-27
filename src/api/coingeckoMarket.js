import axios from 'axios'
import moment from "moment";

const formatSparkline = (numbers) => {
    const sevenDaysAgo = moment().subtract(7, 'days').unix()
    let formatSparkline = numbers.map((item,index) => {
        return {
            x: sevenDaysAgo + (index + 1) * 3600,
            y: item
        }
    })
    return formatSparkline
}

const formatMarketData = (data) => {
    let formattedData = []

    data.forEach(item => {
        const formattedSparkline = formatSparkline(item.sparkline_in_7d.price)
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

export const getMarketData = async (tokenName) => {
    const baseUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tokenName}&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d`
    try{
        const response = await axios.get(baseUrl)
        const data = response.data
        const formattedResponse = formatMarketData(data)
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
