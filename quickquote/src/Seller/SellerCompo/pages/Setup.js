import React, {useEffect, useState} from 'react'
import {AmplifySignOut, withAuthenticator} from '@aws-amplify/ui-react'
import {Card,Button, CardBody, CardHeader} from "reactstrap";
import {Link, useHistory} from 'react-router-dom'
import {Auth} from "@aws-amplify/auth";
import DynamoConfig from "../../../DynamoConfig";
import "../SellerDashBoard.css";

let AWS = require("aws-sdk");


function Setup () {
    const history = useHistory();

    const handleRoute = () =>{
        history.push("/changeParameter");
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

        // await Auth.currentAuthenticatedUser().then((data)=> {
        //     setPrimeKey(data.attributes.sub)
        //
        // });

        //getting userid sub for primary key
        const user=  await Auth.currentAuthenticatedUser();
        console.log(user);
        const id= user.attributes.sub;

        //connecting  to db to look for record with primary key
        AWS.config.update(DynamoConfig);
        let docClient = new AWS.DynamoDB.DocumentClient();

        var params = {
            TableName: "Seller",
            Key: {
                "id":id
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
                setInfo(data.Item);
            }
        })
    }

    //loads data on the start
    useEffect(()=>fetch(),[]);

    return (
        <div className="component">
        <div className= "set">

                <Card>
                    <Card color="danger" style={{width: 330,height:65,marginLeft:"35%", marginRight: "5%"}}>
                        <div className= "text-center">
                        <CardBody>
                            Setup Fee
                           <h1 style={{}}>{info.setupCost}</h1>
                        </CardBody>
                        </div>
                    </Card>

                    <Card color="success" style={{width: 330,height:65,marginLeft:"35%", marginRight: "5%"}}>
                        <div className= "text-center">
                        <CardBody>Cut Cost per inch
                            <h1 style={{float:"right"}}>{info.cutCost}</h1>
                        </CardBody>
                        </div>
                    </Card>

                    <Card color="warning" style={{width: 330,height:65,marginLeft:"35%", marginRight: "5%"}}>
                        <div className= "text-center">
                        <CardBody>Area Cost per material
                            <h1 style={{float:"right"}}>{info.areaCost}</h1>
                        </CardBody>
                        </div>
                    </Card>


                    <Card color="primary" style={{ width: 330,height:65,marginLeft:"35%", marginRight: "5%"}}>
                        <div className= "text-center">
                        <CardBody>Cost per Pierce Point
                            <h1 style={{float:"right"}}>{info.pierceCost}</h1>
                        </CardBody>
                        </div>
                    </Card>

                    <Card color="info" style={{width: 330,height:65,marginLeft:"35%", marginRight: "5%"}}>
                        <div className= "text-center">
                        <CardBody> Process
                            {listItems}
                        </CardBody>
                        </div>
                    </Card>

                </Card>

                <div style={{marginLeft: "43%"}}>
                    <Button  onClick={handleRoute}> Set Parameters > </Button>
                </div>

        </div>
        </div>
    );
}
export default withAuthenticator(Setup);
//export default SellerDashBoard;