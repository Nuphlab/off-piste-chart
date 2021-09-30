import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Bar,
    BarChart,
    CustomizedProps,
    ComposedChart
} from 'recharts';
import {Card, Image, Button, ButtonGroup, Badge} from 'react-bootstrap'
import React, {useState, useEffect} from 'react';
import Select from 'react-select'
import '../app/App.css'
import {getMarketData, getPriceAndTimestamp} from "../api/coingeckoMarket";
import ChartFooter from "./chartFooter";
import {format, parseISO, subDays, fromUnixTime} from "date-fns";

//I've kept some function/variable stubs for future consideration
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
    const [sparkline, setSparkLine] = useState([])
    const [tokenName, setTokenName] = useState('bitcoin')
    const [tokenData, setTokenData] = useState({})
    const [timeFrame, setTimeFrame] = useState(1)
    const [timeFrameMarketData, setTimeFrameMarketData] = useState([])


    const handleChange = async (field, value) => {
        console.log(value)
        setTokenName(value.value)
    }

    useEffect(async () => {
        const fetchMarketData = async () => {
            const marketData = await getMarketData(tokenName)
            let newData = marketData[0]
            setSparkLine(marketData[0]?.sparkline_in_7_d.price)
            setTokenData(newData)
        }

        await fetchMarketData()

        console.log(`TokenName:${tokenName}, Timeframe: ${timeFrame} `)
        setTimeFrameMarketData(await getPriceAndTimestamp(tokenName,'usd', timeFrame))
        console.log('TFMarketData:')
        console.log(timeFrameMarketData)

    },[tokenName, timeFrame])
    //TODO ADD BAR DATA AND SECOND LINE THAT IS RELEVANT TO PROTOTYPE
    //TODO FIX BUG WITH LARGER CHART VALUES (SOLANA, ETH)
    return(
            <Card text={'white'} bg={'dark'} border={"3"}>
                <Card.Header className={'p-0'}>
                    <Select id={'select'} onChange={(value) => handleChange(options, value)} className={'text-black'} options={options}>{options}</Select>
                </Card.Header>
                <Card.Text>
                    <Image width={40} height={40} src={tokenData?.image} roundedCircle>
                    </Image> {tokenData.id?.toUpperCase()}
                    <ButtonGroup className="float-end" size={'sm'} aria-label="Basic example">
                        <Button onClick={() => setTimeFrame(1)} id={'btn1'} class={`btn btn-secondary`} variant="secondary">{'1D'}</Button>
                        <Button onClick={() => setTimeFrame(7)} id={'btn2'} class={`btn btn-secondary`} variant="secondary">{'1W'}</Button>
                        <Button onClick={() => setTimeFrame(30)} id={'btn3'} class={`btn btn-secondary`} variant="secondary">{'1M'}</Button>
                        <Button onClick={() => setTimeFrame(90)} id={'btn3'} class={`btn btn-secondary`} variant="secondary">{'3M'}</Button>
                        <Button onClick={() => setTimeFrame(180)} id={'btn4'} class={`btn btn-secondary`} variant="secondary">{'6M'}</Button>
                        <Button onClick={() => setTimeFrame(365)} id={'btn5'} class={`btn btn-secondary`} variant="secondary">{'1Y'}</Button>
                    </ButtonGroup>
                </Card.Text>
                <Card.Body>
                    <ResponsiveContainer width="100%" height='100%' aspect={3}>
                        <ComposedChart
                            width={300}
                            height={600}
                            data={timeFrameMarketData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 30,
                                bottom: 5,
                            }}
                        >
                            <Bar dataKey={'price'} fill="#8884d8" />
                            <CartesianGrid opacity={.1} vertical={false}/>

                            //TODO Build out a relevant x axis as a marker
                            <XAxis
                                tickLine={false}
                                dataKey={'date'}
                                tickFormatter={
                                    str => {
                                        let date = fromUnixTime(str)
                                        return ""
                                    }
                                }
                            />
                            <YAxis dataKey={'price'} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line dot={false} type="linear" dataKey="price" stroke="#46D168" activeDot={{ stroke: 'red', strokeWidth: 2, r: 3 }}/>
                        </ComposedChart>
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
        console.log(`Label: ${label}`)
        console.log(`Payload: ${payload[0].value}`)
        return (
            <div className="custom-tooltip">
                <span className="badge rounded-pill bg-gradient">
                    <Badge className={'fs-6'}>
                    {`Date: ${fromUnixTime(label/1000).toISOString().slice(0,10)}`}
                    <br/>
                        {`Price: ${Number(payload[0].value).toLocaleString('en-US', {maximumFractionDigits:2})}`}
                    </Badge>
                </span>
            </div>
        );
    }

    return null;
};

const CustomizedLegend = (props) => {
        const { payload } = props;
    return (
        <ul>
        {
            payload.map((entry, index) => (
                <Badge key={`item-${index}`}>
                    {entry.value}
                </Badge>))
        }
        </ul>
    )
}

/*
<Legend content={<CustomizedLegend/>} />
*/
