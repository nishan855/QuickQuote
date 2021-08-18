import React from 'react'
import {AmplifySignOut, withAuthenticator} from '@aws-amplify/ui-react'

let AWS = require("aws-sdk");

function Customer () {

    return (
        <div style = {{margin: '100pt 0pt 0pt 100pt'}}>
            <h1>Customer accounts feature coming soon!</h1>
        </div>
    )
}
export default withAuthenticator(Customer);