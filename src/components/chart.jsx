import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {Container, Tab, Badge, Card, Navbar, Image} from 'react-bootstrap'
import React, {useState, useEffect, Component } from 'react';
import Select from 'react-select'
import makeAnimated from 'react-async'
import {getMarketData, formatMarketData, formatSparkline} from "../api/coingeckoMarket";
import ChartFooter from "./chartFooter";

export function Chart (props) {
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        }]
    const chartData = [
        {
            name: String,
            uv: Number,
            pv: Number,
            amount: Number
        }
    ]
    const options = [
        { value: 'bitcoin', label: 'BITCOIN' },
        { value: 'ethereum', label: 'ETHEREUM' },
        { value: 'solana', label: 'SOLANA' },
        { value: 'cardano', label: 'CARDANO' }
    ]
    //console.log("Token Data in chart page")
    //console.log(props.tokenData)
    const [sparkline, setSparkLine] = useState([])
    const [resultsPerPage, setRPP] = useState(20)
    const [tokenName, setTokenName] = useState('bitcoin')
    const [tokenData, setTokenData] = useState({})
    const [marketData, setMarketData] = useState([])
    const [timeframeChoice, setTimeframeChoice] = useState('24hr')

    const handleChange = async (field, value) => {
        console.log(value)
        setTokenName(value.value)
    }

    useEffect(async () => {
        const fetchMarketData = async () => {
            const marketData = await getMarketData(tokenName)
            setMarketData(marketData)
            let newData = marketData[0]
            setSparkLine(marketData)
            setTokenData(newData)
            //setPercentageChange(data?.price_change_percentage_24h)
            console.log('new data')
            console.log(newData)
        }
        await fetchMarketData()
    },[tokenName])

    return(
            <Card text={'white'} bg={'dark'} border={"2"}>
                <Card.Header className={'p-0'}>
                    <Select id={'select'} onChange={(value) => handleChange(options, value)} className={'text-black'} options={options}>{options}</Select>
                </Card.Header>
                <Card.Title> <Image width={40} height={40} src={tokenData?.image} roundedCircle></Image>{tokenData.id?.toUpperCase()}</Card.Title>
                <Card.Body>
                <ResponsiveContainer width="100%" height="100%" aspect={3}>
                    <LineChart
                        width={600}
                        height={400}
                        data={sparkline[0]?.sparkline_in_7_d.price}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid />
                        <XAxis />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="y" stroke="#46D168" activeDot={{ r: 0 }} />
                        <Legend />
                    </LineChart>
                </ResponsiveContainer>
                </Card.Body>
                <ChartFooter timeframeChoice={timeframeChoice} tokenData={tokenData}></ChartFooter>
            </Card>
    )
}
