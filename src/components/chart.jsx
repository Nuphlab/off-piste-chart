import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, BarChart} from 'recharts';
import {Card, Image, Button, ButtonGroup, Badge} from 'react-bootstrap'
import React, {useState, useEffect} from 'react';
import Select from 'react-select'
import '../app/App.css'
import {getMarketData} from "../api/coingeckoMarket";
import ChartFooter from "./chartFooter";
import {format, parseISO, subDays, fromUnixTime} from "date-fns";

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
    const [tokenName, setTokenName] = useState('bitcoin')
    const [tokenData, setTokenData] = useState({})
    const [marketData, setMarketData] = useState([])
    const [xAxisArray, setXAxisArray] = useState([''])
    const [activeButton1, setActiveButton1] = useState(false)
    const [activeButton2, setActiveButton2] = useState(false)
    const [activeButton3, setActiveButton3] = useState(false)
    const [activeButton4, setActiveButton4] = useState(false)
    const [activeButton5, setActiveButton5] = useState(false)
    const [activeButton6, setActiveButton6] = useState(false)
    const dateSet = new Set([])


    const handleChange = async (field, value) => {
        console.log(value)
        setTokenName(value.value)
    }
    const chartView = (selection) => {

    }

    useEffect(async () => {
        const fetchMarketData = async () => {
            const marketData = await getMarketData(tokenName)
            setMarketData(marketData)
            let newData = marketData[0]
            setSparkLine(marketData[0]?.sparkline_in_7_d.price)
            setTokenData(newData)
            //setPercentageChange(data?.price_change_percentage_24h)
            console.log('new data')
            console.log(newData)
        }
        await fetchMarketData()

       /* sparkline.forEach(p => {
            //console.log(fromUnixTime(p.x))
            let date = fromUnixTime(p.x).getDate()
            dateSet.add(date)
        })
        console.log(dateSet)
        */
        console.log(sparkline)
    },[tokenName])

    return(
            <Card text={'white'} bg={'dark'} border={"2"}>
                <Card.Header className={'p-0'}>
                    <Select id={'select'} onChange={(value) => handleChange(options, value)} className={'text-black'} options={options}>{options}</Select>
                </Card.Header>
                <Card.Title>
                </Card.Title>
                <Card.Text>
                    <Image width={40} height={40} src={tokenData?.image} roundedCircle>
                    </Image> {tokenData.id?.toUpperCase()}
                    <ButtonGroup className="float-end" size={'sm'} aria-label="Basic example">
                        <Button onSubmit={chartView('1D')} id={'btn1'} class={`btn btn-secondary`} variant="secondary">{'1D'}</Button>
                        <Button onSubmit={chartView('1W')} id={'btn2'} class={`btn btn-secondary`} variant="secondary">{'1W'}</Button>
                        <Button onSubmit={chartView('1M')} id={'btn3'} class={`btn btn-secondary`} variant="secondary">{'1M'}</Button>
                        <Button onSubmit={chartView('3M')} id={'btn3'} class={`btn btn-secondary`} variant="secondary">{'3M'}</Button>
                        <Button onSubmit={chartView('6M')} id={'btn4'} class={`btn btn-secondary`} variant="secondary">{'6M'}</Button>
                        <Button onSubmit={chartView('1Y')} id={'btn5'} class={`btn btn-secondary`} variant="secondary">{'1Y'}</Button>
                    </ButtonGroup>
                </Card.Text>
                <Card.Body>
                <ResponsiveContainer width="100%" aspect={3}>
                    <LineChart
                        width={400}
                        height={300}
                        data={sparkline}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid opacity={.1} vertical={false}/>
                        <XAxis
                            tickLine={false}
                            dataKey={'x'}
                            tickFormatter={
                                str => {
                                    let date = fromUnixTime(str)
                                    return ""
                                    // potentially use set to compare with days
                                    //so that we only get unique values for those days
                                    // max number of days per search format

                                    //console.log(date.getDate())
                                    /*
                                    if(dateSet.has(date?.getDate())){
                                        return ""
                                    } else {
                                        //return format(date, "MMM, d")
                                        xAxisArray.push(date)
                                        //return date?.getDate()
                                        return ''
                                    }

                                    if (date.getDate() % 2 === 0) {
                                    return format(date, "MMM, d")
                                    }

                                     */
                                }
                            }
                        />
                        <YAxis/>
                        <Tooltip content={<CustomTooltip />} />
                        <Line dot={false} type="linears" dataKey="y" stroke="#46D168" activeDot={{ stroke: 'red', strokeWidth: 2, r: 3 }}/>
                        <Legend/>
                    </LineChart>
                </ResponsiveContainer>
                </Card.Body>
                <Card.Footer className={'mt-2'}>
                <ChartFooter timeframeChoice={'24hr'} tokenData={tokenData}></ChartFooter>
                </Card.Footer>
            </Card>
    )
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                        <span className="badge rounded-pill bg-gradient">
                            <Badge className={'fs-6'}>
                            {`${fromUnixTime(label).toISOString().slice(0,10)}`}
                            <br/>
                            {`Price: ${payload[0].value.toFixed(2)}`}
                            </Badge>
                        </span>
            </div>
        );
    }

    return null;
};
