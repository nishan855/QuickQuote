import '../../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button} from 'react-bootstrap'
import Dropzone from "react-dropzone";
import React, { useState} from "react";
import {CardHeader} from "reactstrap";
import axios from "axios";
import Server  from "../Server";
import "./DragDropCard.css"
// import Navbar from "../Navbar";

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

        <p className = 'display-file'
           // style={{background:'#E1FCFD',marginTop: '0.5%',borderStyle:'ridge'}}
           key={index} >{n.name}
            <Button className='clear-file-button'
                    id={index} variant="danger"
                    size="sm" style={{height:24}}
                    onClick={remove} >X
            </Button>
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

    function ClearButton () {
        return (
            <Button className={"clear-button"}
                    variant="danger"
                    size="lg"
                    onClick={reset}
            >Clear</Button>
        )
    }

    function UploadButton () {
        return(
            <Button className={"upload-button"}
                    type={"upload"}
                    variant="dark"
                    size="lg"
                    onClick={submit}
            >Upload</Button>
        )
    }

    return(
        <div className='drop-zone-container'>
            <Card className='drop-zone-card'>
                <CardHeader className='drop-zone-card-header'>Upload Your DXF Files</CardHeader>
                <Dropzone accept={'.dxf'} onDrop={acceptedFiles => {
                    setFiles([...files, ...acceptedFiles])
                }
                }>
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div className = 'drop-box-container' {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p className='drop-box-paragraph' >Drag and Drop here <br/> Click to Browse</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
                <Card className = 'button-card'>
                    <p className = 'button-card-paragraph'>Total Files<br/>{files.length}</p>
                    <UploadButton/>
                    <ClearButton/>
                </Card>
                    {display}
            </Card>
        </div>
    )
}

export default DragDropCard