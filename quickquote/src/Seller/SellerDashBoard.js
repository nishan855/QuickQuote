import React from 'react'
import '../App.css'
import {AmplifySignOut, withAuthenticator} from '@aws-amplify/ui-react'
import SellerNavbar from "./SellerCompo/SellerNavbar";
import {Card,Button, CardBody, CardHeader} from "reactstrap";
import {Link, useHistory} from 'react-router-dom'


//Amplify.configure(awsconfig)
//Auth.configure(awsmobile)




function SellerDashBoard () {
    return (
        <div>
            <div>
            <SellerNavbar/>

            <Card>

                <Card color="danger" style={{width: "50%" ,marginLeft:"5%", marginRight: "5%"}}>
                    <CardBody>Setup Fee</CardBody>
                </Card>

                <Card color="success" style={{width:"50%",marginLeft:"5%", marginRight: "5%"}}>
                    <CardBody>Cut Cost per inch</CardBody>
                </Card>

                <Card color="warning" style={{width:"50%",marginLeft:"5%", marginRight: "5%"}}>
                    <CardBody>Area Cost per material</CardBody>
                </Card>

                <Card color="info" style={{width:"50%",marginLeft:"5%", marginRight: "5%"}}>
                    <CardBody>Cost per inch</CardBody>
                </Card>

                <Card color="primary" style={{ width:"50%",marginLeft:"5%", marginRight: "5%"}}>
                    <CardBody>Cost per Pierce Point</CardBody>
                </Card>

                </Card>

                <div style={{float:"right", marginRight: "30%"}}>
                    <Link to="/changeParameter">Set Parameters > </Link>
                </div>

            </div>
        </div>
);
}
export default withAuthenticator(SellerDashBoard);
//export default SellerDashBoard;