import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {Container, Tab, Badge, Card, Navbar, Image} from 'react-bootstrap'
import React, {useState, useEffect } from 'react';
import Select from 'react-select'
import makeAnimated from 'react-async'

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
    const options = [
        { value: 'bitcoin', label: 'BITCOIN' },
        { value: 'ethereum', label: 'ETHEREUM' },
        { value: 'solana', label: 'SOLANA' }
    ]
    //console.log("Token Data in chart page")
    //console.log(props.tokenData)
    const [sparkline, setSparkLine] = useState(Boolean)
    const [resultsPerPage, setRPP] = useState(20)
    const [priceChangePercentage, setPCP] = useState('7d')

    return(
            <Card text={'white'} bg={'dark'} border={"2"}>
                <Card.Header>
                    <Select options={options} placeholder={'Select Token'}></Select>
                </Card.Header>
                <Card.Title> <Image width={40} height={40} src={props.tokenData?.image} roundedCircle></Image>{props.tokenData.id?.toUpperCase()}</Card.Title>
                <Card.Body>
                <ResponsiveContainer width="100%" height="100%" aspect={3}>
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#46D168" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#257D84" />
                    </LineChart>
                </ResponsiveContainer>
                </Card.Body>
            </Card>
    )
}
