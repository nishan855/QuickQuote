import React from 'react'
import '../../App.css'
import Amplify from 'aws-amplify';
import { Auth } from '@aws-amplify/auth';
import awsconfig from '../../aws-exports';
import {AmplifySignOut, withAuthenticator} from '@aws-amplify/ui-react'

Amplify.configure(awsconfig)
//Auth.configure(awsmobile)

function SignUp () {
    return (
        <div className = 'sign-up'>
            <header className= "App-header" >
    <AmplifySignOut/>
    <h2>My signup</h2>
            </header>
        </div>
);
}
export default withAuthenticator(SignUp);
//export default SignUp;