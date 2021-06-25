import React from 'react'
import '../App.css'
import Amplify from 'aws-amplify';
import { Auth } from '@aws-amplify/auth';
import awsconfig from '../aws-exports';
import {AmplifySignOut, withAuthenticator} from '@aws-amplify/ui-react'
import SellerDash from "./SellerDash";
import SellerNavbar from "./SellerCompo/SellerNavbar";

//Amplify.configure(awsconfig)
//Auth.configure(awsmobile)

function SellerSignUp () {
    return (
        <div>
            <div>
            <SellerNavbar/>

            </div>
        </div>
);
}
export default withAuthenticator(SellerSignUp);
//export default SellerSignUp;