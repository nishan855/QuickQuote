import { useState, useEffect } from 'react'
import {Amplify,Storage } from 'aws-amplify'
import S3config from "../../../S3config";
import { Auth } from '@aws-amplify/auth';
import {AmplifyS3ImagePicker} from "@aws-amplify/ui-react";
import awsmobile from "../../../aws-exports";


var AWS = require('aws-sdk');
var s3 = new AWS.S3({'region': 'us-east-2'});
//var identityId = credentialsProvider.getIdentityId();
var identityId = AWS.config.credentials.identityId;
//const user = Auth.currentAuthenticatedUser();
//console.log(user);
//const id = user.attributes.sub;

Amplify.configure(awsmobile);
function UploadPicture() {

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
        <div className="App" >

            <AmplifyS3ImagePicker level="private"  identityId={identityId} onLoad={url => console.log(url)}/>

            <div style={{  marginLeft : '400px' , marginTop: '10px', marginBottom : '50 px' ,float : 'right' }}>
                {

                        <img
                            src={images}
                            key={images}
                            alt= {fetchImages}
                            style={{width: 300, height: 300}}
                            className = "left"
                        />

                }

            </div>
        </div>
    )
}



export default UploadPicture;