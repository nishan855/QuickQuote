import {useState, useEffect} from 'react'
import {Auth} from '@aws-amplify/auth';
import DynamoConfig from "../DynamoConfig";
import {withAuthenticator} from '@aws-amplify/ui-react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {useParams, useHistory} from "react-router-dom";

import {Card, CardBody, CardHeader} from "reactstrap";
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import "./DisplayBuyer.css"

let AWS = require("aws-sdk");

function DisplayBuyer() {
    const [display, setdisplay] = useState("");
    const [name, setname] = useState("");
    const [motto, setmotto] = useState("");
    const [ids, setid] = useState("");
    const userParam = useParams()

    async function fetch() {

        AWS.config.update(DynamoConfig);
        //let docClient = new AWS.DynamoDB.DocumentClient();
        //const user=  await Auth.currentAuthenticatedUser();
        //console.log(user);
        const id = userParam.id;

        //connecting  to db to look for record with primary key
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
            } else {

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
    useEffect(() => fetch(), []);
    //console.log(data.item.cname);

    return (
        <div className = 'logo-motto-container'>
            <Card className = 'logo-card' >
                <div className="text-center">
                    <CardBody>
                        <h2> Welcome to {name}   </h2>

                    </CardBody>
                </div>
            </Card>

            <Card className = 'motto-card' >
                <div className="text-center">
                    <CardBody>
                        <h2> Our Motto : {motto}</h2>

                    </CardBody>
                </div>
            </Card>
        </div>
    );
}

export default DisplayBuyer;