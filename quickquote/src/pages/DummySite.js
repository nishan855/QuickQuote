import React from 'react'
import {Button} from "../compo/Button";
import '../BaseApp.css'
import '../compo/HeroSection.css';

function DummySite () {

    return (
        <div style = {{margin: '0pt 100pt 100pt 0pt'}}>
            <h1 style = {{margin: '100pt 100pt 100pt 50pt'}}>  Dummy Website!</h1>
            <Button
                buttonStyle = 'eric-link'
                link='/buyer/b1959046-0196-4a7a-877d-e87473b4776b'
            >
                Click to get an Instant Quote!
            </Button>
        </div>
    )
}
export default DummySite;
