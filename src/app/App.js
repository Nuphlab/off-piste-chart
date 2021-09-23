import './App.css';
import React, {useState, useEffect } from 'react';
import {apiCall, tokenList} from '../api/tokenApi'
//let d3 handle the controlling of dom through use ref
import logo from '../resources/off-piste-logo.jpeg'
import {Card, Container, Col, Row, Button, Form, ListGroup, Tooltip, Navbar, Image, NavbarBrand} from "react-bootstrap";
import ChartFooter from "../components/chartFooter";
import {Chart} from "../components/chart";
import {ChartHeader} from "../components/chartHeader";
import {NavbarOP} from "../components/navbar";

function App() {

  return (
      <Container fluid className={'Container'}>
          <Row>
          <NavbarOP></NavbarOP>
          </Row>
          <Row>
              <Container>
                  <Card>
                      <Chart></Chart>
                  </Card>
              </Container>
          </Row>
          <Row>
              <ChartFooter></ChartFooter>
          </Row>
      </Container>
  )
}

export default App;

/*
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
              <Row className={'App-footer'}>
                  <Col>
                      <ListGroup horizontal>
                          <ListGroup.Item>
                              <Card className={'Card'}>
                                  <Card.Body className={{'flex-direction': 'row'}}>
                                      <Card.Title>Price</Card.Title>
                                      <Icon size={1} path={mdiInformationOutline}></Icon>
                                  </Card.Body>
                              </Card>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <Card>
                                  <Card.Body>
                                      <Card.Title>Trading Volume</Card.Title>
                                  </Card.Body>
                              </Card>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <Card>
                                  <Card.Body>
                                      <Card.Title>Your Holdings</Card.Title>
                                      <Tooltip></Tooltip>
                                  </Card.Body>
                              </Card>
                          </ListGroup.Item>
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
 */