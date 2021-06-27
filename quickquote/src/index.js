import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import BaseApp from './BaseApp';

var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "AKIARZGXFZKPTIKMFHW5", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);

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
