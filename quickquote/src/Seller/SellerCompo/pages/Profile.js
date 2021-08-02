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
function Profile() {
    return (
        <div className="App">
            <h1>Test</h1>
        </div>
            );
}

export default  Profile;