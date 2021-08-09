// import {useLocation} from "react-router-dom";
// import {
//     Card, CardText, CardBody, CardHeader, CardLink, CardTitle, CardSubtitle, FormGroup
// } from 'reactstrap';
// import React, {useEffect} from "react";
// import {useState} from "react";
// import {useHistory} from "react-router-dom"
// import GetAppIcon from '@material-ui/icons/GetApp';
// import './Order.css'
// import {Auth} from "@aws-amplify/auth";
// import DynamoConfig from "../../../DynamoConfig";
// import {withAuthenticator} from "@aws-amplify/ui-react";
// let AWS= require("aws-sdk")
//
// function Customer(){
//
//     const [primeKey, setPrimeKey] = useState("");
//
//     const [info, setInfo] = useState([])
//
//     const [processList, setProcessList] = useState([]);
//     const [processObj, setProcObj] = useState({
//         "name": "",
//         "email":" ",
//         "address": " ",
//         "phone number": " ",
//     })
//
// //fetching from DB
//     async function fetch() {
//
//         //getting userid sub for primary key
//         const user = await Auth.currentAuthenticatedUser();
//         const id = user.attributes.sub;
//
//
//         //connecting  to db to look for record with primary key
//         AWS.config.update(DynamoConfig);
//         let docClient = new AWS.DynamoDB.DocumentClient();
//
//         const params = {
//             TableName: "Orders",
//             FilterExpression: 'sellerId = :em',
//             ExpressionAttributeValues: {
//                 ":em": id
//             }
//         };
//
//         await docClient.get(params, function (err, info) {
//             if (err) {
//                 console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
//             } else if (info.Items.length > 0) { // here is the info
//
//                     let dt= info.Items
//             }}
//         )
//
//     }
//
//
//     //loads data on the startss
//     useEffect(() => {
//         fetch()
//         console.log("aaa" + info)
//
//     }, []);
//
//
//     return (
//         <div className= "component">
//             <div className= "getmaterial">
//                 <div className = "materialinfo">
//                     <Card >
//                         <CardHeader className='order-card-header' style={{marginTop: "2%",color:"white"}}>Customer Details</CardHeader>
//                         <CardBody>
//                             <CardText>Name: {orderDat.custInfo.name}</CardText>
//                             <CardText>Phone: {orderDat.custInfo.phone}</CardText>
//                             <CardText>Email: {orderDat.custInfo.email}</CardText>
//                             <CardText>Address: {orderDat.custInfo.addrs}</CardText>
//                         </CardBody>
//                     </Card>
//                 </div>
//             </div>
//         </div>
//
//     )
// }
//
// export default withAuthenticator(Customer);
