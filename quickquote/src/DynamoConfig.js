
// This is for dynamodb setup. You should create put your access key id and secretAccess Key for AWS here
    var AWS = require("aws-sdk");
    let awsConfig = {
        "region": "your region",

        "accessKeyId": "Your access KeyID", "secretAccessKey": "your aws secret AccessKey"
    };
    AWS.config.update(awsConfig);
