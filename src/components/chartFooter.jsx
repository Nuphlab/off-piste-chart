import React from 'react'
import {Card, Row, Button, Col, Container, ListGroup, Tooltip, Badge} from "react-bootstrap";
import Icon from "@mdi/react";
import {mdiInformationOutline} from "@mdi/js";

function ChartFooter(props) {
    let price = props.tokenData?.current_price
    let formattedPrice = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    }).format(price)
    let volume = props.tokenData?.total_volume
    let formattedVolume = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    }).format(volume)

    return(
        <ListGroup horizontal>
            <Col lg={3}>
                <ListGroup.Item style={{'background-color': '#282c34'}}>
                    <Card>
                        <Card.Header>Price<Icon size={1} path={mdiInformationOutline} className={'mb-1'}></Icon></Card.Header>
                        <Card.Body>
                            {formattedPrice}
                        </Card.Body>
                        <Card.Footer>
                            <span className="badge rounded-pill bg-primary">Primary
                            <Badge className={{color: "green"}}>9%</Badge>
                            </span>
                        </Card.Footer>
                    </Card>
                </ListGroup.Item>
            </Col>
            <Col lg={3}>
                <ListGroup.Item style={{'background-color': '#282c34'}}>
                    <Card>
                        <Card.Header>Trading Volume<Icon size={1} path={mdiInformationOutline} className={'mb-1'}></Icon></Card.Header>
                        <Card.Body>
                            {formattedVolume}
                        </Card.Body>
                    </Card>
                </ListGroup.Item>
            </Col>
            <Col lg={3}>
                <ListGroup.Item style={{'background-color': '#282c34'}}>
                    <Card>
                        <Card.Header>Your Holdings<Icon size={1} path={mdiInformationOutline} className={'mb-1'}></Icon></Card.Header>
                        <Card.Body>
                            Broke
                        </Card.Body>
                    </Card>
                </ListGroup.Item>
            </Col>
            <Col lg={3}>
                <Card className={'mt-2'}>
                <ListGroup.Item>
                    <Badge pill bg={'black'}></Badge>
                    <label>Price<Icon size={.8} path={mdiInformationOutline} className={'mb-1'}></Icon></label>
                </ListGroup.Item>
                <ListGroup.Item>
                    <label>Market to Value<Icon size={.8} path={mdiInformationOutline} className={'mb-1'}></Icon></label>
                </ListGroup.Item>
                <ListGroup.Item>
                    <label>Volume<Icon  size={.8} path={mdiInformationOutline} className={'mb-1'}></Icon></label>
                </ListGroup.Item>
                </Card>
            </Col>
        </ListGroup>
    )
}

export default ChartFooter
