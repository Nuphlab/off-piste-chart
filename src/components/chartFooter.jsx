import React from 'react'
import {Card, Col, ListGroup, Badge} from "react-bootstrap";
import Icon from "@mdi/react";
import {mdiInformationOutline} from "@mdi/js";
import {mdiArrowUpBold, mdiArrowDownBold} from "@mdi/js";

function ChartFooter(props) {
    let price = props.tokenData?.current_price
    let formattedPrice = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
    }).format(price)
    let volume = props.tokenData?.total_volume
    let formattedVolume = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    }).format(volume)
    let upArrow = () => {
        return(
            <Icon size={.7} path={mdiArrowUpBold} className={'text-success'}></Icon>
        )
    }
    let downArrow = () => {
        return(
            <Icon size={.7} path={mdiArrowDownBold} className={'text-danger'}></Icon>
        )
    }

    return(
        <ListGroup horizontal className={'bg-dark justify-content-center'}>
            <Col lg={3}>
                <ListGroup.Item className={'p-0 border-0 bg-dark'}>
                    <Card bg={'dark text-white'}>
                        <Card.Header>Price<Icon size={1} path={mdiInformationOutline} className={'mb-1'}></Icon></Card.Header>
                        <Card.Body className={'dark'}>
                            {formattedPrice}
                        </Card.Body>
                        <Card.Footer>
                            <span className="badge rounded-pill bg-gradient">
                            <Badge className={'fs-6'}>
                                {props?.timeframeChoice}
                                {props?.tokenData.price_change_percentage_24h > 0 ? upArrow():downArrow()}
                                {props?.tokenData.price_change_percentage_24h}
                            </Badge>
                            </span>
                        </Card.Footer>
                    </Card>
                </ListGroup.Item>
            </Col>
            <Col lg={3}>
                <ListGroup.Item className={'p-0 border-0 bg-dark'}>
                    <Card bg={'dark text-white'}>
                        <Card.Header>Trading Volume<Icon size={1} path={mdiInformationOutline} className={'mb-1'}></Icon></Card.Header>
                        <Card.Body>
                            {formattedVolume}
                        </Card.Body>
                    </Card>
                </ListGroup.Item>
            </Col>
            <Col lg={3}>
                <ListGroup.Item className={'p-0 border-0 bg-dark'}>
                    <Card bg={'dark text-white'}>
                        <Card.Header>Your Holdings<Icon size={1} path={mdiInformationOutline} className={'mb-1'}></Icon></Card.Header>
                        <Card.Body>
                            Broke
                        </Card.Body>
                    </Card>
                </ListGroup.Item>
            </Col>
            <Col lg={3}>
                <Card className={'border-0'}>
                    <Card.Header className={'p-0 border-0'}>
                <ListGroup.Item className={'bg-dark text-white'}>
                    <label>Price<Icon size={.8} path={mdiInformationOutline} className={'mb-1'}></Icon></label>
                </ListGroup.Item>
                <ListGroup.Item className={'bg-dark text-white'}>
                    <label>Market to Value<Icon size={.8} path={mdiInformationOutline} className={'mb-1'}></Icon></label>
                </ListGroup.Item>
                <ListGroup.Item className={'bg-dark text-white'}>
                    <Badge pill></Badge>
                    <label>Volume<Icon  size={.8} path={mdiInformationOutline} className={'mb-1'}></Icon></label>
                </ListGroup.Item>
                    </Card.Header>
                </Card>
            </Col>
        </ListGroup>
    )
}

export default ChartFooter
