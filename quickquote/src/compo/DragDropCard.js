import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button} from 'react-bootstrap'
import Dropzone from "react-dropzone";
import React, {useEffect, useState} from "react";
import {CardHeader, CardTitle} from "reactstrap";
import axios from "axios";
import Server  from "../compo/Server";
import Navbar from "../compo/Navbar";


function DragDropCard () {

    const formData = new FormData();

    const [files, setFiles]= useState([]);

    const remove=event=> {
        const name= event.target.getAttribute("id")

        const newList = Object.assign([],files);
        newList.splice(name,1);
        setFiles(newList);
    }


    //display component
    const display=Array.from(files).map((n,index)=>

        <p style={{background:'#E1FCFD',marginTop: '0.5%',borderStyle:'ridge'}} key={index} >{n.name}
            <Button className={"float-right"} id={index} variant="danger" size="sm" style={{height:24}} onClick={remove} >X</Button>

        </p>
    )

    const reset = event =>{

        const newList =[]
        setFiles(newList);
    }

    const submit=event=>{

        for(let i=0; i<files.length;i++) {

            formData.append('file', files[i]);
        }

        axios({
            method: 'post',
            url: `${Server}`,
            data: formData,
            headers: {'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {
                    //handle success
                    console.log(response);
                },
                function(error) {
                    // handle error
                });
    }

    const DropzoneCardStyle = {
        border:'groove',
        borderColor: '#000000',
        background: '#6d6e6e',
        alignItems: 'center',
        width: '100%',
        marginTop: '100px',
    }
    const DropzoneCardHeaderStyle = {
        width: '100%',
        fontWeight:'bold',
        background:'#232323',
        color: '#fff',
    }
    const DropzoneStyle = {
        lineHeight: "500%",
        // marginBottom:'0%',
        // marginRight:'0%',
        // marginLeft:'0%',
        // marginTop: '0%',
        cursor: 'pointer',

    }
    const DropzonePStyle = {
        color: '#fff',
        fontWeight: "bold",
        textAlign: 'center',
    }

    const ButtonCardStyle = {
        marginTop:'2%',
        marginBottom: '100px',
        fontWeight:'bold',
        background:'#6d6e6e',
        borderColor: '#000000',
        color: '#ffffff',   // Text color
    }

    return(
        <div className = 'seller' >
            <div>
                <Card style={DropzoneCardStyle}>
                    <CardHeader style={DropzoneCardHeaderStyle}>Upload Your DXF Files</CardHeader>
                    <Dropzone  accept={'.dxf'} onDrop={acceptedFiles =>{
                        setFiles([...files,...acceptedFiles])}
                    }>
                        {({getRootProps, getInputProps}) => (
                            <section style = {{
                                width: '90%',
                                height: '500%',
                                alignItems: 'center',
                                marginTop: '5%',
                                marginBottom: '5%',
                                borderStyle:'dashed',
                            }}>
                                <div  style={DropzoneStyle}{...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p style={DropzonePStyle}>Drag and Drop here <br/> Click to Browse</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </Card>
                <Card style={ButtonCardStyle} >
                    <CardHeader style={{fontWeight:'bold'}}>Total Files: {files.length}
                        <Button className={"float-right"} style={{ borderStyle: 'outset', width:'12vw',fontSize:'2vw'}} variant="danger" size="sm" onClick={reset} >Clear</Button>
                        <Button className={"float-right"} type={"submit"} style={{marginLeft: '100px', marginRight: '1rem',width:'13vw',fontSize:'2vw',borderStyle: 'outset'}} variant="primary" size="sm"
                                onClick={submit}>Submit</Button>
                    </CardHeader>

                    {display}
                </Card>
            </div>
        </div>
    )
}

export default DragDropCard