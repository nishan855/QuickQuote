import {useLocation} from "react-router-dom";
import {Card, CardText, CardBody,CardHeader, CardLink, CardTitle, CardSubtitle
} from 'reactstrap';
import React from "react";
import GetAppIcon from '@material-ui/icons/GetApp';

export default function OrderItem(){

    const location=useLocation()
    const orderDat=location.state.ordrData
    console.log(orderDat)

    return(
        <div>
            <CardHeader style={{marginTop: "2%", marginBottom:"2%", background:'#14A76c'}}>
                <CardTitle tag="h5">Order ID: <label style={{color:"blue"}}>{orderDat.orderId}</label></CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{orderDat.orderDate}</CardSubtitle>
            </CardHeader>

            {orderDat.data.map((ord,ind)=>
                <Card key={ind}>
                    <CardHeader style={{background:"#3FEEE6"}}>{ord.fileKey}<GetAppIcon style={{float:"right"}}/></CardHeader>
                    <CardBody>
                        <CardText> Quantity: {ord.quantity}</CardText>
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