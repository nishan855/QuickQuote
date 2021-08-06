import React from 'react'
import '../BaseApp.css'

import {Amplify} from "aws-amplify";
import { Auth } from '@aws-amplify/auth';
import awsconfig from "../aws-exports";
import {AmplifySignOut, withAuthenticator} from "@aws-amplify/ui-react";
import SellerDashBoard from "../Seller/SellerCompo/SellerDashBoard";

Amplify.configure(awsconfig);

    const SignUp = ({ history }) => {
        // Check if the user is already logged in
        if (Auth.user.attributes.email && Auth.currentAuthenticatedUser()) {
            // Redirecting the user already logged in
            history.push("/seller");
        };

        return (
            <div className='signup'>


            </div>
        )
}

export default withAuthenticator(SignUp);