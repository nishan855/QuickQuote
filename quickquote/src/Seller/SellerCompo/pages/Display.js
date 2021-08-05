import { useState, useEffect } from 'react'
import { Auth } from '@aws-amplify/auth';
import DynamoConfig from "../../../DynamoConfig";
import {withAuthenticator} from '@aws-amplify/ui-react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import  {Card,CardBody,CardHeader} from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

let AWS= require("aws-sdk");

function Display()
{
    const[display,setdisplay] = useState("");
    const[name,setname] = useState("");
    const[motto,setmotto]= useState("");
    const[ids,setid] = useState("");

    async function fetch () {

        const user=  await Auth.currentAuthenticatedUser();
        console.log(user);
        const id= user.attributes.sub;

        let docClient = new AWS.DynamoDB.DocumentClient();


        var params = {
            TableName: "SellerProfile",
            Key: {
                "sellerid": id
            }
        };

        await docClient.get(params, function (err, data) {
            if (err) {
                console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
            }  else {

                    setname(data.Item.info[0].cname)
                    setmotto(data.Item.info[0].cmotto)
                    setid(id)

            }
        })
    }

    //const show = display.map((dt,i) =>

        //<h3>{dt.cname}</h3>
    console.log(ids);
    //)
    //console.log(display.cname)
    useEffect(()=>fetch(),[]);
    //console.log(data.item.cname);

    return(

            <div className = "component">
                <div className= "set">

                    <Card>

                        <Card color="success" style={{width: 900,height:70}}>
                            <div className= "text-center">
                                <CardBody>
                                    <h2>Company Id : {ids}  </h2>

                                </CardBody>
                            </div>
                        </Card>
            <Card color="success" style={{width: 900,height:70}}>
                <div className= "text-center">
                    <CardBody>
                        <h2>Company Name : {name}  </h2>

                    </CardBody>
                </div>
            </Card>


                <Card color="success" style={{width: 900,height:70}}>
                    <div className= "text-center">
                        <CardBody>
                            <h2> Motto : {motto}</h2>

                        </CardBody>
                    </div>
                </Card>

            </Card>

                </div>
                </div>


    );


}

export default Display;