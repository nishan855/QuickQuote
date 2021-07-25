import React, {useEffect, useState} from 'react'
import {AmplifySignOut, withAuthenticator} from '@aws-amplify/ui-react'
import {Card,Button, CardBody, CardHeader} from "reactstrap";
import {Link, useHistory} from 'react-router-dom'
import {Auth} from "@aws-amplify/auth";
import DynamoConfig from "../../../DynamoConfig";
import "../SellerDashBoard.css";
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

let AWS = require("aws-sdk");


function Material () {

    const [primeKey, setPrimeKey] = useState("");

    const [info, setInfo] = useState([])

    const [processList, setProcessList] = useState([]);
    const [processObj, setProcObj] = useState({
        "procname": "",
        "inch": 0,
        "pierce": 0,
        "setup": 0,
        "kurf": 0
    })

    const showData=info.map((inf)=>
        <Card>
            <Card color="danger" style={{width: 340,height:65}}>
                <div className= "text-center">
                    <CardBody>
                        <h3>Material Name : {inf.matname}</h3>

                    </CardBody>
                </div>
            </Card>

            <Card color="success" style={{width: 340,height:65}}>
                <div className= "text-center">
                    <CardBody> <h3>Material Density: {inf.mdensity}</h3>
                    </CardBody>
                </div>
            </Card>

            <Card color="warning" style={{width: 340,height:65}}>
                <div className= "text-center">
                    <CardBody><h3>Material Thickness: {inf.mthickness}</h3>
                    </CardBody>
                </div>
            </Card>


            <Card color="primary" style={{width: 340,height:65}}>
                <div className= "text-center">
                    <CardBody><h3>Material Cost: {inf.matCost}</h3>
                    </CardBody>
                </div>
            </Card>

            <Card color="info" style={{width: 340,height:65}}>
                <div className= "text-center">
                    <CardBody><h3> Cut Speed: {inf.cutspd}</h3>
                    </CardBody>
                </div>
            </Card>

            <Card color="secondary" style={{width: 340,height:65}}>
                <div className= "text-center">
                    <CardBody><h3> Lead Distance: {inf.lead}</h3>
                    </CardBody>
                </div>
            </Card>

            {inf.process.map(p=>
                <div>
                    <Card color="tertiary" style={{width: 340,height:65}}>
                        <div className= "text-center">
                            <CardBody><h3> Process Name: { p.procname}</h3>
                            </CardBody>
                        </div>
                    </Card>

                    <Card color="info" style={{width: 340,height:65}}>
                        <div className= "text-center">
                            <CardBody><h3>Set up Cost: {p.inch}</h3>
                            </CardBody>
                        </div>
                    </Card>
                </div>
            )}


        </Card>

    )

//fetching from DB
    async function fetch() {

        //getting userid sub for primary key
        const user = await Auth.currentAuthenticatedUser();
        const id = user.attributes.sub;


        //connecting  to db to look for record with primary key
        AWS.config.update(DynamoConfig);
        let docClient = new AWS.DynamoDB.DocumentClient();

        var params = {
            TableName: "Test",
            Key: {
                "t1": id,
            }
        };


        await docClient.get(params, function (err, data) {
            if (err) {
                console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
            } else if (data.Item == null) {
                setInfo(info);
            } else {
                setInfo(data.Item.material);


            }
        })
    }

    //loads data on the startss
    useEffect(() => {
        fetch()
        console.log(info)

    }, []);


    return (
        <div className= "">

            {info.length !=0? <div> {showData}</div>:null}
        </div>
    )
}
export default withAuthenticator(Material);