import './App.css';
import React, {useState, useEffect } from 'react';
import {apiCall, tokenList} from '../api/tokenApi'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import logo from '../resources/off-piste-logo.jpeg'
//let d3 handle the controlling of dom through use ref
import {Card, Container, Col, Row, Button, Form, ListGroup} from "react-bootstrap";
import { useForm } from "react-hook-form";

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
    const [tokenName, setTokenName] = useState("bitcoin")
    const [currencyType, setTokenType] = useState("usd")
    const [tokenInfo, setTokenInfo] = useState({})
    const [list, setTokenList] = useState([])
    const [selectedOption, setSelectedOption] = useState(null);
    const { register, handleSubmit } = useForm();

    function handleToken(data) {
        setTokenName(data.tokenName)
        console.log(data)
    }

    useEffect(() => {
        async function newList() {
            /*
            let coinObj = await tokenList()
            if(coinObj === undefined) {return}
            coinObj = coinObj.map( coinObj => ({value:coinObj.id, label:coinObj.name}) )
            setTokenList(coinObj)
            console.log(coinObj)
            //setTokenList(list)
            //let info = await apiCall(tokenName, currencyType)
             */


            let info = await apiCall(tokenName, "usd")
            setTokenInfo(info)
            setTokenName(Object.keys(info.data)[0].toUpperCase())
            //console.log(info)
        }
        newList()
    }, [tokenName])
  return (
      <div className="App">
          <header className="App-header">
              <Form className='mb-3' onSubmit={handleSubmit(handleToken)}>
                  <input type="input" {...register('tokenName', { required: true })} className="form-control" id="token" name='tokenName' placeholder="token"/>
                  <button type="submit" className="btn btn-danger">Submit</button>
              </Form>
          <Card>
              <Card.Img src={logo}/>
              <Card.Body>
                  <Card.Title>{tokenName}</Card.Title>
                  <Card.Text style={{color: "#000"}}>
                  </Card.Text>
              </Card.Body>
          </Card>
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
          </header>
              <Row className={'App-footer'}>
                  <Col>

                      <ListGroup horizontal>
                          <ListGroup.Item>
                              <Card>
                                  <Card.Body>
                                      <Card.Title>Price</Card.Title>
                                  </Card.Body>
                              </Card>
                          </ListGroup.Item>
                          <ListGroup.Item>Trading Volume</ListGroup.Item>
                          <ListGroup.Item>Your Holdings</ListGroup.Item>
                      </ListGroup>
                  </Col>
                  <Col>
                      <ListGroup>
                          <ListGroup.Item>Price</ListGroup.Item>
                          <ListGroup.Item>Market to Value</ListGroup.Item>
                          <ListGroup.Item>Volume</ListGroup.Item>
                      </ListGroup>
                  </Col>
              </Row>
    </div>
  )
}

export default App;
