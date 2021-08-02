/*import { useState, useEffect } from 'react'
import { Storage } from 'aws-amplify'
import S3config from "../../../S3config";
import { Auth } from '@aws-amplify/auth';

var AWS = require('aws-sdk');
var s3 = new AWS.S3({'region': 'us-east-2'});
//var identityId = credentialsProvider.getIdentityId();
var identityId = AWS.config.credentials.identityId;
//const user = Auth.currentAuthenticatedUser();
//console.log(user);
//const id = user.attributes.sub;
function Profile() {
    const [images, setImages] = useState([])
    useEffect(() => {
        fetchImages()
    }, [])
    async function fetchImages() {
        let imageKeys = await Storage.list('', {
            level: 'private',
            identityId: identityId // the identityId of that user
        })
        try{
            imageKeys = await Promise.all(imageKeys.map(async k => {
                const key = await Storage.get(k.key)
                return key
            }))

        }
        catch(error)
        {
            console.error(error)
        }
        console.log('imageKeys: ', imageKeys)
        setImages(imageKeys)
    }
    async function onChange(e) {
        const file = e.target.files[0];
        try {
            const result = await Storage.put(file.name, file,
                {
                    level : 'private'
                })

            console.log({result})
            fetchImages()
        }

        catch (error)
        {
            console.log(error);
        }
    }
    return (
        <div className="App">
            <h1>Test</h1>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {
                    images.map(image => (
                        <img
                            src={image}
                            key={image}
                            style={{width: 300, height: 200}}
                        />
                    ))
                }
            </div>
            <input
                type="file"
                onChange={onChange}
            />
        </div>
    );
}

export default Profile;

 */
import { useState, useEffect } from 'react'
import { Auth } from '@aws-amplify/auth';
import DynamoConfig from "../../../DynamoConfig";

import  {Card,CardBody,CardHeader} from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

let AWS= require("aws-sdk");

function Profile() {
    const information =[];
    const[info,setinfo] = useState({
        "cname":"",
        "cmotto" :"",


    });
    async function save() {

        AWS.config.update(DynamoConfig);
        let DynamoDB = new AWS.DynamoDB.DocumentClient();

        //getting sub as user id
        const user = await Auth.currentAuthenticatedUser();
        console.log(user);
        const id = user.attributes.sub;
        console.log(id);
        var params = {
            TableName: "SellerProfile",
            Item: {
                "sellerid": id,
                //array of process
                "info": information
            }
        };

        DynamoDB.put(params, function (err) {
            if (err) {
                console.log(err);
            }

            //this is put
        });


    }

    const onsaveClick = () => {
        information.push(info);
        console.log(information);
        save();

    }

    return (
        <div className="App">
            <Card>
                <CardHeader
                    style={{background: "#71bbd4", marginBottom: '2%'}}>Profile Setup </CardHeader>

                    <FormGroup>
                        <Label for="exampleEmail">Company Name</Label><span></span>
                        <input placeholder=" Input Company Name" defaultValue={info.cname}

                               onChange={(e) => {
                                   setinfo(prevState => ({
                                       ...prevState,
                                       cname: e.target.value

                                   }));
                               }}/>

                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Company motto </Label><span></span>
                        <input  placeholder="input Company motto" defaultValue={info.cmotto}

                                onChange={(e) => {
                                    setinfo(prevState => ({
                                        ...prevState,
                                        cmotto: e.target.value
                                    }));
                                }}/>

                    </FormGroup>

                    <Button title="click to add process" size="sm"
                            style={{background: '#9DC88D', marginBottom: '2%'}} onClick={onsaveClick}>Add Information
                    </Button>
            </Card>
        </div>
            );
}

export default  Profile;