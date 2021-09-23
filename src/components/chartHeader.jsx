import React, {useEffect, useState} from 'react'
import {Form, Card} from "react-bootstrap";
import { useForm } from "react-hook-form";
import logo from '../resources/off-piste-logo.jpeg'
import {apiCall} from "../api/tokenApi";

export function ChartHeader() {
    const [tokenName, setTokenName] = useState("bitcoin")
    const { register, handleSubmit } = useForm();
    const onSubmit = (data, e) => console.log(data, e);
    const onError = (errors, e) => console.log(errors, e);

    const [currencyType, setTokenType] = useState("usd")
    const [tokenInfo, setTokenInfo] = useState({})
    const [list, setTokenList] = useState([])
    const [selectedOption, setSelectedOption] = useState(null);

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

    function handleToken(data) {
        setTokenName(data.tokenName)
        console.log(data)
    }
    return(
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
            </header>
        </div>
    )
}
