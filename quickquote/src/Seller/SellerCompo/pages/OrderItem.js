import {useLocation} from "react-router-dom";
import {Card, CardText, CardBody,CardHeader, CardLink, CardTitle, CardSubtitle
} from 'reactstrap';
import React, {useEffect} from "react";
import {useState} from "react";
import {useHistory} from "react-router-dom"
import GetAppIcon from '@material-ui/icons/GetApp';
import './Order.css'
let AWS= require("aws-sdk")

export default function OrderItem(){

    const location=useLocation()
    const orderDat=location.state.ordrData
    const [innerKey,setIk]=(useState([]))

    //region and bucket name
    const S3_BUCKET = 'dxfstorage-quickquote';
    const REGION = 'us-east-2';
    const s3 = new AWS.S3();

    useEffect(()=>{
        fetchFile()

    },[])

    const key=[]
    function fetchFile(){

        orderDat.data.map((d)=> {

            var params = {
                Bucket: S3_BUCKET,
                Key: d.fileKey
            };
            s3.getObject(params, function (err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else {
                    key.push(data.Body)
                    setIk(key)
                };
            })

        })

    }
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
                    <CardHeader className='order-item-card-header'> {ord.fileKey}
                    <a style={{float:"right"}} href={URL.createObjectURL(new Blob([innerKey[ind]], {type: "application/octet"}))}  download={ord.fileKey}>Download</a>
                    </CardHeader>

                    <CardBody>
                        <CardText>Quantity: {ord.quantity}</CardText>
                        <CardText>Material: {ord.material}</CardText>
                        <CardText>Process: {ord.process}</CardText>
                        <CardText>Cost: ${ord.cost}</CardText>
                    </CardBody>
                </Card>

            )}

            <Card >
                <CardHeader className='order-card-header' style={{marginTop: "2%",color:"white"}}>Customer Details</CardHeader>
                <CardBody>
                    <CardText>Name: {orderDat.custInfo.name}</CardText>
                    <CardText>Phone: {orderDat.custInfo.phone}</CardText>
                    <CardText>Email: {orderDat.custInfo.email}</CardText>
                    <CardText>Address: {orderDat.custInfo.addrs}</CardText>
                </CardBody>
            </Card>

        </div>
    )
}