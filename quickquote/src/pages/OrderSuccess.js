import Navbar from "../compo/Navbar";
import React from "react";
import {Card, CardBody, CardHeader} from "reactstrap";
import  {useLocation} from "react-router-dom";
import {useState} from "react";

 export default function OrderSuccess(){

const location =useLocation();
const name= location.state.cust
    const id= location.state.ordrId

    return(<div>
            <Navbar style={{marginBottom:"2%"}}/>
        <Card>
            <CardHeader style={{background:"green"}}>Order Successful</CardHeader>
            <CardBody>
            <label>Congratutulations {name}, your order has been placed succefully</label>
               <br/>
                <label>OrderId: {id}</label>
                <br/>
                <label> A representative from QuickQuote will email you about the details of the order.</label>
                </CardBody>
        </Card>
    </div>
)
}