import React, {Component, useCallback, useState} from 'react';
import {Card,Button} from 'react-bootstrap'
import Dropzone, {useDropzone} from "react-dropzone";

function FileUpload(){

    const[selected,setSelected]= useState([]);

    //ref
    const hiddenfile= React.useRef(null);

    const handleClick=event=>{
        hiddenfile.current.click();
    }

    const remove=event=> {
        const name= event.target.getAttribute("id")

        const newList = Object.assign([],selected);
        newList.splice(name,1);
        setSelected(newList);
    }
    const filelist=Array.from(selected).map((n,index)=>

            <p style={{background:" #4D774E" ,marginTop: '1%'}} key={index} >{n.name}
                <Button className={"float-right"} id={index} variant="danger" size="sm" style={{height:24}} onClick={remove}>X</Button>

            </p>

        )

    const onChangeHandler= e =>{
        setSelected([...selected,...e.target.files]);

    }
    //
        const onDrop = useCallback(acceptedFiles => {
            console.log(acceptedFiles)
            setSelected([...selected,...acceptedFiles])
        });

        const {
            getRootProps,
            getInputProps
        } = useDropzone({
            onDrop
        });

       console.log(selected)
    return(
        <Card style={{width: '60%', marginLeft:'2%', margintop:'2%'}}>
            {selected.length===0 ?<div>
            <Card.Header style={{background:'#007CC7'}}> DXF File Uploads</Card.Header>
            <br/>


            <Card.Title>Upload all of your DXF files</Card.Title>
            <Card.Text>All files uploaded are secured and confidential.</Card.Text>
                    <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
            </div> :

                <div >
                    <Card.Header style={{background:'#007CC7' ,fontSize:25,fontWeight:'bold'}}> Total files: {selected.length}</Card.Header>
                    {filelist}
                    <Dropzone onDrop={acceptedFiles => setSelected([...selected,...acceptedFiles])}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
                }

             <br/>
             <div>
                 <Button onClick={handleClick}>
                     Add Files
                 </Button>
             <input type="file" className="form-control" multiple name="file"  accept={".dxf"} onChange={onChangeHandler}
                   ref={hiddenfile}  onClick={(event)=> {
                        event.currentTarget.value = null
                    }} hidden/>

               </div>


        </Card>
    )
}
export default  FileUpload;





