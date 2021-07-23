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

    const [primeKey,setPrimeKey]=useState("");

    const[info,setInfo]=useState({
        "process" : [],
        "matname": "",
        "mdensity": "",
        "mthickness": "",
        "matCost": "",
        "cutspd": "",
        "msize": "",
        "lead": ""}
    )

    const [processList, setProcessList] = useState([]);
    const [processObj, setProcObj] = useState({
        "procname": "",
        "inch": 0,
        "pierce": 0,
        "setup": 0,
        "kurf": 0
    })

    const listItems = info.process.map((number) =>
        <div>
            <li style={{float: "right"}}> {number}</li>
            <br/>
        </div>
    );
//fetching from DB
    async function fetch () {

        //getting userid sub for primary key
        const user=  await Auth.currentAuthenticatedUser();
        console.log(user);
        console.log("hello");
        const id= user.attributes.sub;
        console.log(id);

        //connecting  to db to look for record with primary key
        AWS.config.update(DynamoConfig);
        let docClient = new AWS.DynamoDB.DocumentClient();

        var params = {
            TableName: "Test",
            Key: {
                "t1":id,
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
                //for(let i =0 ; i < ; i ++) {
                    setInfo(data.Item.material[0]);
                    setProcObj(data.Item.material[0].process[0])
                //}


                console.log(data.Item.material[0].process[0].inch);
                // info.pierceCost = data.Item.material[0].cutspd;
                // info.matname = data.Item.material[0].matname;
                //     console.log(data.Item.material[0].matname);

            }
        })
    }

    //loads data on the startss
    useEffect(()=>fetch(),[]);

    return (
        <div className="component">
            <div className= "material">
            <div className= "set">
                <Card>
                    <Card color="danger" style={{width: 340,height:65}}>
                       <div className= "text-center">
                           <CardBody>
                               <h3>Material Name : {info.matname}</h3>

                             </CardBody>
                         </div>
                     </Card>

                     <Card color="success" style={{width: 340,height:65}}>
                         <div className= "text-center">
                             <CardBody> <h3>Material Density: {info.mdensity}</h3>
                             </CardBody>
                         </div>
                    </Card>

                     <Card color="warning" style={{width: 340,height:65}}>
                         <div className= "text-center">
                             <CardBody><h3>Material Thickness: {info.mthickness}</h3>
                             </CardBody>
                         </div>
                     </Card>


                     <Card color="primary" style={{width: 340,height:65}}>
                         <div className= "text-center">
                             <CardBody><h3>Material Cost: {info.matCost}</h3>
                             </CardBody>
                         </div>
                     </Card>

                     <Card color="info" style={{width: 340,height:65}}>
                         <div className= "text-center">
                             <CardBody><h3> Cut Speed: {info.cutspd}</h3>
                            </CardBody>
                         </div>
                     </Card>

                    <Card color="secondary" style={{width: 340,height:65}}>
                        <div className= "text-center">
                            <CardBody><h3> Lead Distance: {info.lead}</h3>
                            </CardBody>
                        </div>
                    </Card>

                 </Card>



             </div>

            <div className= "process">
                <Card>
                    <CardHeader className = "text-center" style={{
                        background: '#9DC88D'
                    }}> Process {processList.length + 1}  {} </CardHeader>
                </Card>
                <div className= "processInfo">
                    <h6>Process Name: {processObj.procname}</h6>
                    <h6>Set Up Cost: {processObj.procname}</h6>
                    <h6>Price per inch: {processObj.setup}</h6>
                    <h6>Price Per Pierce: {processObj.pierce}</h6>
                    <h6>Process Kurf: {processObj.kurf}</h6>
                </div>

            </div>
            </div>
        </div>
    );
}
export default withAuthenticator(Material);
