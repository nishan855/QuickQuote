import React, {useEffect, useState} from 'react'
import '../App.css'
import {AmplifySignOut, withAuthenticator} from '@aws-amplify/ui-react'
import SellerNavbar from "./SellerCompo/SellerNavbar";
import {Card,Button, CardBody, CardHeader} from "reactstrap";
import {Link, useHistory} from 'react-router-dom'
import {Auth} from "@aws-amplify/auth";
import DynamoConfig from "../DynamoConfig";

let AWS = require("aws-sdk");



function SellerDashBoard () {
    const history = useHistory();

    const handleRoute = () =>{
        history.push("/changeParameter");
    }

    const [primeKey,setPrimeKey]=useState("");

    const[info,setInfo]=useState([])



    // const listItems = info.process.map((number) =>
    //     <div>
    //     <li style={{float: "right"}}> {number}</li>
    //     <br/>
    //     </div>
    // );
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
            TableName: "Test",
            Key: {
                "t1":id
            }
        };


       await docClient.get(params, function (err, data) {
            if (err) {
                console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
            }
            else if (data.Item==null){
                setInfo(null);

           }
            else {
                console.log(data.Item);
                setInfo(data.Item);

            }
        })
    }

   //loads data on the start
    useEffect(()=>fetch(),[info]);

    return (
        <div>
            <div>
            <SellerNavbar/>

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

                    </CardBody>

                </Card>

                </Card>

                <div style={{float:"right", marginRight: "30%"}}>
                    <Button  onClick={handleRoute}> Set Parameters > </Button>
                </div>

            </div>
        </div>
);
}
export default withAuthenticator(SellerDashBoard);
//export default SellerDashBoard;