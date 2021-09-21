import './App.css';
import React, { PureComponent, useState, useRef, useEffect } from 'react';
//import * as d3 from 'd3'
import './App.css'
import {apiCall} from '../src/api-test'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import logo from '../src/resources/off-piste-logo.jpeg'
import '../src/resources/styles.css'
//let d3 handle the controlling of dom through use ref

function App() {
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
//<label id="price"></label>
    //<button  onClick={apiCall}>btc price</button>
  return (
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
  );
}

export default App;
