import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button, Spinner} from 'react-bootstrap'
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
import DisplayBuyer from "./DisplayBuyer"
import DynamoConfig from "../DynamoConfig";
import './Buyer.css'

export default function Buyer() {

    // Get data from DB
    const userParam = useParams()
    const [mat, setMat] = useState([]);
    const [matOps, setMatOps] = useState([]);
    const [procOps, setProcOps] = useState([]);


    async function fetch() {
        console.log("Fetching Materiel Object from DB...");
        //connecting  to db to look for record with primary key
        AWS.config.update(DynamoConfig);
        let docClient = new AWS.DynamoDB.DocumentClient();
        const id = userParam.id;
        var params = {
            TableName: "Test",
            Key: {
                "t1": id
            }
        };

        await docClient.get(params, function (err, data) {
            if (err) {
                console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
            } else if (data.Item == null) {
                // setInfo(null);
            } else {
                // console.log(data.Item);
                // setInfo(data.Item);
                setMat(data.Item);
                console.log(" Finished");

            }
        })
    }

    useEffect(() => {
        console.log("here")
        console.log(procOps)
        fetch()
        if (mat.length != 0) {
            console.log(mat)
            console.log(mat.material.length)

        } else
            console.log("Mat Empty")
    }, [mat.length]);   // Not sure what this does. Seems to update only when 'mat' has values.


    const param = useParams()
    const history = useHistory()
    const formData = new FormData();
    const [resp, setResp] = useState([])
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
    const Display = () => {

        //stoores proceses for material //array of array of object
        const [matOption, setMoption] = useState([])


        //for every file assign a dummy process
        useEffect(() => {
            files.map((mp) =>

                setMoption(prev => [...prev, mat.material[0].process]))
        }, [])

        return (
            files.map((n, index) =>

                <div className = 'file-display-container' key={index}>{n.file.name}
                    <Button className='file-clear-button' id={index} variant="danger"
                            size="sm" onClick={remove}
                    >X</Button>
                    <div className = 'file-parameters-container'>
                        <input type={"number"} required placeholder="Quantity" onChange={(e) => {
                            files[index].quantity = e.target.value
                        }}/>

                        {/*Dropdown menu for material selection - Populated from array above*/}
                        <select name="matOps" onChange={(e) => {
                            if (e.target.value >= 0) {
                                files[index].Material = mat.material[e.target.value].matname
                                let arr = Object.assign([], matOption)
                                arr.splice(index, 1, mat.material[e.target.value].process)
                                setMoption(arr)

                            }
                        }}>
                            <option value={-1}>Select Material</option>
                            {mat.material.map((matOps, ind) =>
                                <option key={ind} value={ind}>{matOps.matname} ({matOps.mthickness}" )</option>
                            )}
                        </select>

                        {/*dropdown for process*/}
                        <select onChange={(e) => {

                            if (e.target.value != -1) {
                                files[index].process = matOption[index][e.target.value].procname
                            }
                        }}>
                            <option value={-1}>Select Process</option>
                            {matOption.length > 0 && matOption[index].map((pr, ind) =>
                                <option key={ind} value={ind}>{pr.procname}</option>
                            )}

                        </select>

                        <input type={"text"} required placeholder="Lead time" onChange={(e) => {
                            files[index].leadtime = e.target.value
                        }}
                        />

                    </div>
                </div>
            ))

    }

    const reset = event => {
        const newList = []
        setFiles(newList);
    }

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

                //Consol log to just make sure data is valid before it is sent to backend
                console.log(files);


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
                        history.push(
                            {
                                pathname: '/quote',
                                state: {
                                    quote: response.data,
                                    filedata: files,
                                    id: param.id
                                }
                            }
                        )

                    },
                    function (error) {
                        // handle error
                        history.push(
                            {
                                pathname: '/quoteError',
                                state: {
                                    message: error.message,
                                }
                            }
                        )
                    });

        } else {
            notify()
        }
    }

    return (
        <div className='buyer-page-container'>
            <Navbar/>
            {!submitBtn ?
                <div className='buyer-container'>
                    <DisplayBuyer/>
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
                                    <div className='dropzone' {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p className='dropzone-p'>Drag and Drop here <br/> Click to Browse</p>
                                    </div>
                                )}
                            </Dropzone>
                        </Card>


                        <Card className='dropzone-button-card'>
                            <CardHeader style={{fontWeight: 'bold'}}>Total Files: {files.length}
                                <Button className='dropzone-clear-button'
                                        variant="danger"
                                        size="sm" onClick={reset}>Clear</Button>
                                <Button className='dropzone-submit-button' type={"submit"}  disabled={submitBtn} variant="primary" size="sm"
                                        onClick={submit}>Submit</Button>
                            </CardHeader>

                            <Display/>

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
                :
                <div align={"center"}>
                    <Loader type="Puff" color="#00BFFF" height={"30%"} width={"30%"}/>
                    <h1> Getting quotes...</h1>
                </div>}
        </div>
    )

}