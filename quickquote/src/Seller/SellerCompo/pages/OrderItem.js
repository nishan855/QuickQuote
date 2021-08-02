import {useLocation} from "react-router-dom";
import {Card, CardText, CardBody,CardHeader, CardLink, CardTitle, CardSubtitle
} from 'reactstrap';
import React from "react";
import GetAppIcon from '@material-ui/icons/GetApp';
import './Order.css'

export default function OrderItem(){

    const location=useLocation()
    const orderDat=location.state.ordrData
    console.log(orderDat)

    return(
        <div className='order-container'>
            <CardHeader className = 'order-card-header'>
                <CardTitle className = 'order-card-title'>Order ID:
                    <label className = 'order-card-header-title'> {orderDat.orderId}</label>
                </CardTitle>
                <CardSubtitle tag="h6" className = 'order-card-header-subtitle'>{orderDat.orderDate}</CardSubtitle>
            </CardHeader>

            {orderDat.data.map((ord,ind)=>
                <Card key={ind}>
                    <CardHeader className='order-item-card-header'>Buyer ID: {ord.fileKey}<GetAppIcon style={{float:"right"}}/></CardHeader>
                    <CardBody>
                        <CardText>Quantity: {ord.quantity}</CardText>
                        <CardText>Material: {ord.material}</CardText>
                        <CardText>Process: {ord.process}</CardText>
                        <CardText>Cost: ${ord.cost}</CardText>
                    </CardBody>
                </Card>

            )}

            <Card>
                <CardHeader style={{marginTop: "2%"}}>Customer Details</CardHeader>
            </Card>

        </div>
    )
}