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
        <div className= "getmaterial">
            <div classNme = "materialinfo">
                <Card>
                    <div className= "material">
                        <FormGroup>
                            <Card color="danger" style={{width: 190,height:45}}>
                                <div className= "text-center">
                                    <p>Material Name : {inf.matname}</p>
                                </div>
                            </Card>
                        </FormGroup><span></span>
                        <FormGroup>
                            <Card color="success" style={{width: 190,height:35}}>
                                <div className= "text-center">
                                    <p>Material Density: {inf.mdensity}</p>

                                </div>
                            </Card>

                        </FormGroup><span></span>

                        <FormGroup>
                            <Card color="warning" style={{width: 190,height:35}}>
                                <div className= "text-center">
                                    <p>Material Thickness: {inf.mthickness}</p>
                                </div>
                            </Card>
                        </FormGroup><span></span>

                        <FormGroup>
                            <Card color="primary" style={{width: 190,height:35}}>
                                <div className= "text-center">
                                    <p>Material Cost: {inf.matCost}</p>
                                </div>
                            </Card>
                        </FormGroup><span></span>

                        <FormGroup>
                            <Card color="info" style={{width: 190,height:35}}>
                                <div className= "text-center">
                                    <p> Cut Speed: {inf.cutspd}</p>

                                </div>
                            </Card>
                        </FormGroup><span></span>

                        <FormGroup>
                            <Card color="secondary" style={{width: 190,height:35}}>
                                <div className= "text-center">
                                    <p> Lead Distance: {inf.lead}</p>

                                </div>
                            </Card>
                        </FormGroup>
                    </div>

                    {inf.process.map(p=>
                        <div className = "materialinfo">
                                <div className= "material">
                                    <FormGroup>
                                        <Card color="secondary" style={{width: 190,height:35}}>
                                            <div className= "text-center">
                                                <p> Process Name: { p.procname}</p>
                                            </div>
                                        </Card>
                                    </FormGroup><span></span>
                                    <FormGroup>
                                        <Card color="info" style={{width: 190,height:35}}>
                                            <div className= "text-center">
                                                <p> Cut cost: { p.inch}</p>
                                            </div>
                                        </Card>
                                    </FormGroup><span></span>
                                    <FormGroup>
                                        <Card color="success" style={{width: 190,height:35}}>
                                            <div className= "text-center">
                                                <p> Pierce Cost : { p.inch}</p>
                                            </div>
                                        </Card>
                                    </FormGroup><span></span>
                                    <FormGroup>
                                        <Card color="warning" style={{width: 190,height:35}}>
                                            <div className= "text-center">
                                                <p> Set up cost : { p.setup}</p>
                                            </div>
                                        </Card>
                                    </FormGroup><span></span>
                                    <FormGroup>
                                        <Card color="light" style={{width: 190,height:35}}>
                                            <div className= "text-center">
                                                <p> Process Kurf : { p.kurf}</p>
                                            </div>
                                        </Card>
                                    </FormGroup><span></span>
                                </div></div>
                    )}
                </Card>
            </div>
        </div>
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

    }, [info]);


    return (
        <div className= "component">
            {info.length !=0? <div> {showData}</div>:null}
        </div>

    )
}
export default withAuthenticator(Material);
