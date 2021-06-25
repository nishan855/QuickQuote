import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import BaseApp from './BaseApp';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import * as AWS from 'aws-sdk'
import {CofigurationOptions} from 'aws-sdk'

const configuration: CofigurationOptions ={
    region: 'YOUR_REGION',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
    accessKeyId: 'YOUR_ACCESS_KEY_ID'
}

AWS.config.update(configuration);
Amplify.configure(config);

ReactDOM.render(
  <React.StrictMode>
    <BaseApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
