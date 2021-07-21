import '../../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button} from 'react-bootstrap'
import Dropzone from "react-dropzone";
import React, {useState} from "react";
import {CardHeader} from "reactstrap";
import axios from "axios";
import Server from "../Server";

// import Navbar from "../Navbar";


function DragDropCard() {

    const formData = new FormData();

    const [files, setFiles] = useState([]);

    const remove = event => {
        const name = event.target.getAttribute("id")

        const newList = Object.assign([], files);
        newList.splice(name, 1);
        setFiles(newList);
    }


    //display component
    const display = Array.from(files).map((n, index) =>

        <p style={{background: '#E1FCFD', marginTop: '0.5%', borderStyle: 'ridge'}} key={index}>{n.name}
            <Button className={"float-right"} id={index} variant="danger" size="sm" style={{height: 24}}
                    onClick={remove}>X</Button>

        </p>
    )

    const reset = event => {

        const newList = []
        setFiles(newList);
    }

    const submit = event => {

        for (let i = 0; i < files.length; i++) {

            formData.append('file', files[i]);
        }

        axios({
            method: 'post',
            url: `${Server}`,
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}
        })
            .then(function (response) {
                    //handle success
                    console.log(response);
                },
                function (error) {
                    // handle error
                });
    }

    const DropzoneCardStyle = {
        border: 'groove',
        borderColor: '#000000',
        background: '#6d6e6e',
        alignItems: 'center',
        display: 'flex',
        width: '90vmin',
        height: 'auto',
        marginTop: '100px',
        marginBottom: '100px',
    }
    const DropzoneCardHeaderStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        fontSize: '5vmin',
        fontWeight: 'bold',
        background: '#232323',
        color: '#fff',
    }
    const DropzoneStyle = {
        lineHeight: "100%",
        // marginBottom:'0%',
        // marginRight:'0%',
        // marginLeft:'0%',
        // marginTop: '0%',
        cursor: 'pointer',

    }
    const DropzonePStyle = {
        color: '#fff',
        // height: '100pt',
        width: '60vmin',
        fontSize: '4vmin',
        fontWeight: "bold",
        textAlign: 'center',
        textJustify: 'center',
        borderStyle: 'dashed',
    }

    const ButtonCardStyle = {
        marginTop: '2%',
        display: 'flex',
        flexDirection: 'row',
        // marginTop: 'auto',
        float: 'bottom',
        width: '100%',
        // marginBottom: '100px',
        fontWeight: 'bold',
        background: '#232323',
        borderColor: '#000000',
        color: '#ffffff',   // Text color
    }
    const ClearButtonStyle = {
        borderStyle: 'outset',
        width: '30vmin',
        marginLeft: '1%',
        marginRight: '1%',
        marginTop: '2%',
        marginBottom: '2%',
        fontSize: '3vmin',
        float: 'right',
    }

    function ClearButton() {
        return (
            <Button className={"clear-button"}
                    style={ClearButtonStyle}
                    variant="danger"
                    size="lg"
                    onClick={reset}
            >Clear</Button>
        )
    }

    const UploadButtonStyle = {
        borderStyle: 'outset',
        width: '30vmin',
        marginLeft: 'auto',
        marginRight: '1%',
        marginTop: '2%',
        marginBottom: '2%',
        fontSize: '3vmin',
        float: 'right',
    }

    function UploadButton() {
        return (
            <Button className={"upload-button"}
                    type={"upload"}
                    style={UploadButtonStyle}
                    variant="dark"
                    size="lg"
                    onClick={submit}
            >Upload</Button>
        )
    }

    return (
        <div className='seller'>
            <div>
                <Card style={DropzoneCardStyle}>
                    <CardHeader style={DropzoneCardHeaderStyle}>Upload Your DXF Files</CardHeader>
                    <Dropzone accept={'.dxf'} onDrop={acceptedFiles => {
                        setFiles([...files, ...acceptedFiles])
                    }
                    }>
                        {({getRootProps, getInputProps}) => (
                            <section style={{
                                // width: '90%',
                                // height: '500%',
                                alignItems: 'center',
                                marginTop: '5%',
                                marginBottom: '5%',
                            }}>
                                <div style={DropzoneStyle}{...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p style={DropzonePStyle}>Drag and Drop here <br/> Click to Browse</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    <Card style={ButtonCardStyle}>
                        {/*<CardHeader style={{fontWeight:'bold'}}>Total Files: {files.length}*/}
                        <h1 style={{
                            fontSize: '4vmin',
                            float: "left",
                            marginRight: '2%',
                            marginTop: "2%",
                            marginLeft: '2%'
                        }}>Total Files: {files.length}</h1>
                        <UploadButton/>
                        <ClearButton/>
                        {/*</CardHeader>*/}
                        {display}
                    </Card>
                </Card>
            </div>
        </div>
    )
}

export default DragDropCard