import {Button, Card, CardBody} from "reactstrap";
import React, {useEffect, useState} from "react";
import {useHistory,useParams} from "react-router-dom";
import {Auth} from "@aws-amplify/auth";
import DynamoConfig from "../DynamoConfig";
import Navbar from "../compo/Navbar";

let AWS = require("aws-sdk");

function BuyerHomepage(){
    const param=useParams()

    const [sellerExists,setSexists]=useState(false)

    const history = useHistory();

    const handleRoute = () =>{
        history.push({
            pathname: '/buyer/placeOrder/'+ param.id,
        });
    }


    const [primeKey,setPrimeKey]=useState("");

    const[info,setInfo]=useState({
        "process" : [],
        "pierceCost": "",
        "areaCost": "",
        "setupCost": "",
        "id": "",
        "cutCost": "",
        "material": " "}
    )



    const listItems = info.process.map((number) =>
        <div>
            <li style={{float: "right"}}> {number}</li>
            <br/>
        </div>
    );

//fetching from DB
    async function fetch () {


        //connecting  to db to look for record with primary key
        AWS.config.update(DynamoConfig);
        let docClient = new AWS.DynamoDB.DocumentClient();

        var params = {
            TableName: "Seller",
            Key: {
                "id": param.id
            }
        };


        await docClient.get(params, function (err, data) {
            if (err) {
                console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
            }
            else if (data.Item==null){
                setInfo(info);
            }
            else {
                setSexists(true);
                setInfo(data.Item);
            }
        })
    }

    //loads data on the start
    useEffect(()=>fetch(),[]);


    return(

        <div>
            <Navbar/>
        {sellerExists?
    <div>
<Card>
    <Card color="danger" style={{width: "50%" ,marginLeft:"5%", marginRight: "5%"}}>
        <CardBody>
            Setup Fee
            <h1 style={{float:"right"}}>{info.setupCost}</h1>
        </CardBody>
    </Card>

    <Card color="success" style={{width:"50%",marginLeft:"5%", marginRight: "5%"}}>
        <CardBody>Cut Cost per inch
            <h1 style={{float:"right"}}>{info.cutCost}</h1>
        </CardBody>
    </Card>

    <Card color="warning" style={{width:"50%",marginLeft:"5%", marginRight: "5%"}}>
        <CardBody>Area Cost per material
            <h1 style={{float:"right"}}>{info.areaCost}</h1>
        </CardBody>
    </Card>


    <Card color="primary" style={{ width:"50%",marginLeft:"5%", marginRight: "5%"}}>
        <CardBody>Cost per Pierce Point
            <h1 style={{float:"right"}}>{info.pierceCost}</h1>
        </CardBody>
    </Card>

    <Card color="info" style={{width:"50%",marginLeft:"5%", marginRight: "5%"}}>
        <CardBody> Process
            {listItems}
        </CardBody>

    </Card>

</Card>

<div style={{float:"right", marginRight: "30%"}}>
    <Button  onClick={handleRoute}> Get Quotes > </Button>
</div>

</div>:

    <div>
        <h1>OOps!!! seller doesnot exist....</h1>

        </div>}
</div>

)
}
export default BuyerHomepage;