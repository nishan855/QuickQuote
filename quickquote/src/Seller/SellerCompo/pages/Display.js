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

        //connecting  to db to look for record with primary key
        AWS.config.update(DynamoConfig);
        let docClient = new AWS.DynamoDB.DocumentClient();

        var params = {
            TableName: "SellerProfile",
            Key: {
                "sellerid":id
            }
        };
        console.log("Before scan");

        docClient.scan(params, function (err, data) {
            if (err) {
                console.log(err);
                console.log("Here");
            }
            setname(data.Items[0].info[0].cname);
            setmotto(data.Items[0].info[0].cmotto);
            setid(id);
            //console.log(data.Items[0].info[0].cname)
            //console.log(data.Items[0].info[0].cmotto)



            if(data.Items.length > 0)
            {
                let dt = data.Items.info
                setdisplay(dt);
                console.log("No error")
               console.log(dt);
                //console.log(data.item.cmotto);
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