import React from 'react'
import {Card, Row, Button, Col, Container, ListGroup, Tooltip, Badge} from "react-bootstrap";
import Icon from "@mdi/react";
import {mdiInformationOutline} from "@mdi/js";

function ChartFooter() {
    return(
        <Container>
        <ListGroup horizontal>
            <Col>
                <ListGroup.Item style={{'background-color': '#282c34'}}>
                    <Card>
                        <Card.Header>Price<Icon size={1} path={mdiInformationOutline}></Icon></Card.Header>
                        <Card.Body>
                            $5.09
                        </Card.Body>
                        <Card.Footer>
                            <span className="badge rounded-pill bg-primary">Primary
                            <Badge className={{color: "green"}}>9%</Badge>
                            </span>
                        </Card.Footer>
                    </Card>
                </ListGroup.Item>
            </Col>
            <Col>
                <ListGroup.Item style={{'background-color': '#282c34'}}>
                    <Card>
                        <Card.Header>Trading Volume<Icon size={1} path={mdiInformationOutline}></Icon></Card.Header>
                        <Card.Body>
                        </Card.Body>
                    </Card>
                </ListGroup.Item>
            </Col>
            <Col>
                <ListGroup.Item style={{'background-color': '#282c34'}}>
                    <Card>
                        <Card.Header>Your Holdings<Icon size={1} path={mdiInformationOutline}></Icon></Card.Header>
                        <Card.Body>
                            <Tooltip></Tooltip>
                        </Card.Body>
                    </Card>
                </ListGroup.Item>
            </Col>
            <Col>
                <Card className={'mt-2'}>
                <ListGroup.Item>
                    <Badge pill bg={'green'}></Badge>
                    <label>Price<Icon size={.8} path={mdiInformationOutline}></Icon></label>
                </ListGroup.Item>
                <ListGroup.Item>
                    <label>Market to Value<Icon size={.8} path={mdiInformationOutline}></Icon></label>
                </ListGroup.Item>
                <ListGroup.Item>
                    <label>Volume<Icon size={.8} path={mdiInformationOutline}></Icon></label>
                </ListGroup.Item>
                </Card>
            </Col>
        </ListGroup>
        </Container>
    )
}

export default ChartFooter
