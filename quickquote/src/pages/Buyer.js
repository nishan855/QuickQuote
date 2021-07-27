import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button} from 'react-bootstrap'
import Dropzone from "react-dropzone";
import React, {useEffect, useState} from "react";
import {CardHeader} from "reactstrap";
import axios from "axios";
import Server from "../compo/Server";
import Navbar from "../compo/Navbar";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useParams, useHistory} from "react-router-dom";
import Loader from "react-loader-spinner"
import * as AWS from "aws-sdk";
import DynamoConfig from "../DynamoConfig";
import './Buyer.css'
import DisplayComponent from "./BuyerComponents/DisplayComponent";

export default function Buyer() {

    const param = useParams()
    const history = useHistory()
    const formData = new FormData();
    const [resp, setResp] = useState([])
    const [files, setFiles] = useState([]);
    const fill = [];
    const [submitBtn, setSubmit] = useState(false);
    const display = DisplayComponent(files);

    // const remove = event => {
    //     const name = event.target.getAttribute("id")
    //     const newList = Object.assign([], files);
    //     newList.splice(name, 1);
    //     setFiles(newList);
    // }

    const reset = event => {
        const newList = []
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

    const submit = () => {
        if (files.length != 0) {
            setSubmit(true)
            // const dxfData = [];
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

                //Consol log to just make sure data is valid before it is sent to backend
                console.log(files[i].quantity);
                console.log(files[i].process);
                console.log(files[i].Material);
                console.log(files[i].leadtime);

                formData.append("files", files[i].file)
                formData.append("quantity", files[i].quantity)
                formData.append("process", files[i].process)
                formData.append("material", files[i].Material)
                formData.append("lead", files[i].leadtime)
            }
            formData.append("id", param.id)
            console.log(param.id)

            axios({
                method: 'post',
                url: `${Server}`,
                data: formData,
            })
                .then(function (response) {
                        //handle success
                        console.log(response)
                        setResp(response.data);
                        history.push(
                            {
                                pathname: '/quote',
                                state: resp
                            }
                        )
                    },
                    function (error) {
                        // handle error
                    });
        } else {
            notify()
        }
    }

    return (
        <div>
            <Navbar/>
            <div className='seller'>
                <div>
                    <Card className='dropzone-card'>
                        <CardHeader className='dropzone-card-header'>Upload Your DXF Files</CardHeader>
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
                                <div className='dropzone-box'{...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p className='dropzone-box-paragraph'>Drag and Drop here <br/> Click to Browse
                                    </p>
                                </div>
                            )}
                        </Dropzone>
                    </Card>

                    <Card className='button-card'>
                        <CardHeader style={{fontWeight: 'bold'}}>Total Files: {files.length}
                            <Button className={"float-right clear-button"}
                                    variant="danger" size="sm"
                                    onClick={reset}>Clear</Button>
                            <Button className={"float-right submit-button"}
                                    type={"submit"} disabled={submitBtn}
                                    variant="primary" size="sm"
                                    onClick={submit}>Submit</Button>
                            {submitBtn ?
                                <div>
                                    <Loader
                                        type="Circles"
                                        color="#00BFFF"
                                        height={100}
                                        width={100}
                                    />
                                    <h1>Getting quotes...</h1>

                                </div> : null}

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
        </div>
    )
}