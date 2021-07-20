import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button} from 'react-bootstrap'
import Dropzone from "react-dropzone";
import React, {useEffect, useState} from "react";
import {CardHeader, CardTitle} from "reactstrap";
import axios from "axios";
import Server from "../compo/Server";
import Navbar from "../compo/Navbar";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useParams} from "react-router-dom";

export default function Buyer() {

    const materialOptions = [
        {
            label: "T6 Aluminum 0.03\"", //What is diplayed
            value: "t6_aluminum_0.03", //Name of variable
        },
        {
            label: "T6 Aluminum 0.06\"", //What is diplayed
            value: "t6_aluminum_0.06", //Name of variable
        },
        {
            label: "T6 Aluminum 0.125\"", //What is diplayed
            value: "t6_aluminum_0.125", //Name of variable
        },
        {
            label: "T6 Aluminum 0.25\"", //What is diplayed
            value: "t6_aluminum_0.25", //Name of variable
        },
        {
            label: "A36 Steel 0.03\"", //What is diplayed
            value: "a36_steel_0.03", //Name of variable
        },
        {
            label: "A36 Steel 0.06\"", //What is diplayed
            value: "a36_steel_0.06", //Name of variable
        },
        {
            label: "A36 Steel 0.125\"", //What is diplayed
            value: "a36_steel_0.125", //Name of variable
        },
        {
            label: "A36 Steel 0.25\"", //What is diplayed
            value: "a36_steel_0.25", //Name of variable
        },
    ];

    const param = useParams()

    const formData = new FormData();

    const [files, setFiles] = useState([]);

    const fill = [];

    const [submitBtn, setSubmit] = useState(false);

    const remove = event => {
        const name = event.target.getAttribute("id")

        const newList = Object.assign([], files);
        newList.splice(name, 1);
        setFiles(newList);
    }

    const notify = () => {
        toast.error('Please add at least one file', {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    }

    //display component
    const display = Array.from(files).map((n, index) =>

        <p style={{background: '#71bbd4', marginTop: '0.5%', borderStyle: 'ridge'}} key={index}>{n.file.name}
            <Button className={"float-right"} id={index} variant="danger" size="sm" style={{height: 24}}
                    onClick={remove}>X</Button>
            <div style={{fontSize: "50%"}}>

                <input type={"number"} required placeholder="Quantity" onChange={(e) => {
                    files[index].quantity = e.target.value
                }}/>

                {/*Dropdown menu for material selection - Populated from array above*/}
                <select type={"text"} required placeholder="Process" onChange={(e) => {
                    files[index].Material = e.target.value
                }}>
                    {materialOptions.map((materialOptions) => (
                        <option value={materialOptions.value}>{materialOptions.label}</option>
                    ))}
                </select>

                {/*<input type={"text"} required placeholder="Material and Size" onChange={(e)=>*/}
                {/*{files[index].Material=e.target.value*/}
                {/*}}/>*/}

                <input type={"text"} required placeholder="Process" onChange={(e) => {
                    files[index].process = e.target.value
                }}/>
                <input type={"text"} required placeholder="Lead time" onChange={(e) => {
                    files[index].leadtime = e.target.value
                }}
                />

            </div>
        </p>
    )

    const reset = event => {
        const newList = []
        setFiles(newList);
    }


    const res = []


    const submit = event => {

        if (files.length != 0) {


            setSubmit(true)
            const dxfData = [];

            for (let i = 0; i < files.length; i++) {

                let obj = {
                    "quantity": "",
                    "process": "",
                    "Material": "",
                    "leadtime": ""
                }


                obj.quantity = files[i].quantity;
                obj.process = files[i].process;
                obj.Material = files[i].Material;
                obj.leadtime = files[i].leadtime;

                formData.append("files", files[i].file)
                formData.append("quantity", files[i].quantity)
                formData.append("process", files[i].process)
                formData.append("material", files[i].Material)
                formData.append("lead", files[i].leadtime)

            }

            formData.append("id", param.id)
            console.log(param.id)
            // axios.post(`${Server}`, {
            //    res
            //})

            axios({
                method: 'post',
                url: `${Server}`,
                data: formData,
            })
                .then(function (response) {
                        //handle success
                        console.log(response);
                    },
                    function (error) {
                        // handle error
                    });

        } else {
            notify()
        }
    }

    const DropzoneCardStyle = {
        border: 'groove',
        borderColor: '#000000',
        background: '#6d6e6e',
        alignItems: 'center',
        width: '100%',
        marginTop: '100px',
    }
    const DropzoneCardHeaderStyle = {
        width: '100%',
        fontWeight: 'bold',
        background: '#232323',
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
        marginTop: '2%',
        marginBottom: '100px',
        fontWeight: 'bold',
        background: '#6d6e6e',
        borderColor: '#000000',
        color: '#ffffff',   // Text color
    }


    return (
        <div className='seller'>
            <div>
                <Navbar/>

                <Card style={DropzoneCardStyle}>
                    <CardHeader style={DropzoneCardHeaderStyle}>Upload Your DXF Files</CardHeader>
                    <Dropzone accept={'.dxf'} onDrop={acceptedFiles => {

                        acceptedFiles.map(
                            af => {

                                let obj = {
                                    "file": "",
                                    "quantity": "",
                                    "process": "",
                                    "Material": "",
                                    "leadtime": ""
                                }


                                obj.file = af

                                fill.push(obj)
                            }
                        )

                        setFiles([...files, ...fill])

                    }

                    }>

                        {({getRootProps, getInputProps}) => (
                            <section style={{
                                width: '90%',
                                height: '500%',
                                alignItems: 'center',
                                marginTop: '5%',
                                marginBottom: '5%',
                                borderStyle: 'dashed',
                            }}>
                                <div style={DropzoneStyle}{...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p style={DropzonePStyle}>Drag and Drop here <br/> Click to Browse</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </Card>


                <Card style={ButtonCardStyle}>
                    <CardHeader style={{fontWeight: 'bold'}}>Total Files: {files.length}
                        <Button className={"float-right"}
                                style={{borderStyle: 'outset', width: '12vw', fontSize: '2vw'}} variant="danger"
                                size="sm" onClick={reset}>Clear</Button>
                        <Button className={"float-right"} type={"submit"} style={{
                            marginLeft: '100px',
                            marginRight: '1rem',
                            width: '13vw',
                            fontSize: '2vw',
                            borderStyle: 'outset'
                        }} disabled={submitBtn} variant="primary" size="sm"
                                onClick={submit}>Submit</Button>
                    </CardHeader>

                    {display}
                </Card>
                <ToastContainer
                    position="bottom-right"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>


        </div>
    )

}