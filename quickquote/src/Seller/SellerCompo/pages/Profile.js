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
import {Link, useHistory} from "react-router-dom";
import  {Card,CardBody,CardHeader} from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Display from "./Display.js"
import UploadPicture from "./UploadPicture.js"

let AWS= require("aws-sdk");

function Profile() {
    const information =[];
    const history=useHistory()
    const [info,setinfo] = useState({
        "cname":"",
        "cmotto" :"",
    });

    //const handledisplay {
      //  history.push('/Display')

    //}
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
        history.push('/Display')

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
                    style={{background: "#71bbd4", marginBottom: '2%', width:800 , height:50}}><h2>Profile Setup</h2> </CardHeader>

                    <FormGroup style = {{ width:800}}>
                        <Label for="exampleEmail">Company Name</Label><span></span>
                        <input placeholder=" Input Company Name" defaultValue={info.cname}

                               onChange={(e) => {
                                   setinfo(prevState => ({
                                       ...prevState,
                                       cname: e.target.value

                                   }));
                               }}/>

                    </FormGroup>

                    <FormGroup style = {{width:800}}>
                        <Label for="exampleEmail">Company motto </Label><span></span>
                        <input  placeholder="input Company motto" defaultValue={info.cmotto}

                                onChange={(e) => {
                                    setinfo(prevState => ({
                                        ...prevState,
                                        cmotto: e.target.value
                                    }));
                                }}/>

                    </FormGroup>
                <UploadPicture/>
                    <Button title="click to save profile info" size="sm"
                            style={{background: '#9DC88D',marginTop:'2%', marginBottom: '2%'}} onClick={onsaveClick}>Save Profile
                    </Button>
                <Button title="view what you saved" size="sm"
                        style={{background: '#9DC88D', marginBottom: '2%'}} onClick = {() => history.push('/Display')}> View Profile
                </Button>
                {/*             <Button title="upload a picture" size="sm"
                        style={{background: '#9DC88D', marginBottom: '2%'}} onClick = {() => history.push('/UploadPicture')}>Upload photo
                </Button>
*/}

            </Card>
        </div>
            );
}

export default  Profile;