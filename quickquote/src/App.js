import logo from './logo.svg';
import FileUpload from "./compo/fileUpload";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button} from 'react-bootstrap'
import Dropzone from "react-dropzone";
import React, {useEffect, useState} from "react";
import {CardHeader, CardTitle} from "reactstrap";
import axios from "axios";
import Server  from "./Server";



function App() {

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







    return (
        <div style={{marginLeft:"5%", marginRight:"5%"}}>
        <Card style={{border:'groove'}}>
            <CardHeader style={{fontWeight:'bold', marginBottom:"2%", background:'#9CF6FB'}}>Upload Your DXF Files</CardHeader>
        <Dropzone  accept={'.dxf'} onDrop={acceptedFiles =>{
            setFiles([...files,...acceptedFiles])}

        }>
            {({getRootProps, getInputProps}) => (
                <section>
                    <div  style={{borderStyle:'dashed', lineHeight:"300%",marginBottom:'2%', marginRight:'2%', marginLeft:'2%'}}{...getRootProps()}>
                        <input {...getInputProps()} />
                        <p style={{fontWeight: "bold", textAlign:'center'}}>Drag and Drop here <br/> Click to Browse</p>
                    </div>
                </section>
            )}
        </Dropzone>
  </Card>
            <Card style={{marginTop:'2%'}} >
                <CardHeader style={{fontWeight:'bold', background:'#9CF6FB'}}>Total Files: {files.length}
                    <Button className={"float-right"} style={{borderStyle: 'outset', width:'12vw',fontSize:'2vw'}} variant="danger" size="sm" onClick={reset} >Clear</Button>
                    <Button className={"float-right"} type={"submit"} style={{marginRight: '1rem',width:'13vw',fontSize:'2vw',borderStyle: 'outset'}} variant="primary" size="sm"
                    onClick={submit}>Submit</Button>
                </CardHeader>

            {display}
            </Card>

    </div>
    )

}

export default App;
