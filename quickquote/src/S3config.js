import Amplify, { Auth, Storage } from 'aws-amplify';
// for purpose of saving image on s3 bucket base on cognito userpools
//stores images on s3 for all users on cognito
//not fully functional on web app

//replace all of the below information with yours
Amplify.configure({

    Auth: {
        identityPoolId:  "", //REQUIRED - Amazon Cognito Identity Pool ID
        region:  "",//- Amazon Cognito Region
        userPoolId: "", //OPTIONAL - Amazon Cognito User Pool ID
        userPoolWebClientId: "", //OPTIONAL - Amazon Cognito Web Client ID
    },

    //your buucket info where information is stored
    Storage: {
        AWSS3: {
            bucket: "", //REQUIRED -  Amazon S3 bucket name
            region: "", //OPTIONAL -  Amazon service region
        }
    }
});