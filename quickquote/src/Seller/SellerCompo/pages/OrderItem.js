import {useLocation} from "react-router-dom";
import {Card, CardText, CardBody, CardLink, CardTitle, CardSubtitle
} from 'reactstrap';
import React from "react";

export default function OrderItem(){

    const location=useLocation()
    const orderDat=location.state.ordrData

    return(
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Order ID: {orderDat.orderId}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{orderDat.orderDate}</CardSubtitle>
                </CardBody>

                <CardBody>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <CardLink href="#">Card Link</CardLink>
                    <CardLink href="#">Another Link</CardLink>
                </CardBody>
            </Card>
        </div>
    )
}