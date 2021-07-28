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
import {useParams,useHistory} from "react-router-dom";
import Loader from "react-loader-spinner"
import * as AWS from "aws-sdk";
import DynamoConfig from "../DynamoConfig";

export default function Buyer() {

    // Get data from DB
    const userParam=useParams()
    const [mat, setMat] = useState( []);
    const [matOps, setMatOps] = useState ( [] );
    const [procOps, setProcOps] = useState ( [] );




    async function fetch () {
        console.log("Fetching Materiel Object from DB...");
        //connecting  to db to look for record with primary key
        AWS.config.update(DynamoConfig);
        let docClient = new AWS.DynamoDB.DocumentClient();
        const id= userParam.id;
        var params = {
            TableName: "Test",
            Key: {
                "t1":id
            }
        };

        await docClient.get(params, function (err, data) {
            if (err) {
                console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
            }
            else if (data.Item==null){
                // setInfo(null);
            }
            else {
                // console.log(data.Item);
                // setInfo(data.Item);
                setMat(data.Item);
                console.log(" Finished");

            }
        })
    }

    useEffect(()=> {
        console.log("here")
        console.log(procOps)
        fetch()
        if(mat.length != 0){
            console.log(mat)
            console.log(mat.material.length)

        }
        else
            console.log("Mat Empty")
    } ,[mat.length]);   // Not sure what this does. Seems to update only when 'mat' has values.



    const param = useParams()
    const history =useHistory()

    const formData = new FormData();
    const[resp,setResp]=useState([])

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
    const Display = ()=>{

        //stoores proceses for material //array of array of object
        const [matOption, setMoption]=useState([])


        //for every file assign a dummy process
useEffect(()=>{files.map((mp)=>

               setMoption(prev=>[...prev,mat.material[0].process]))
    }
        ,[])



        return(
            files.map((n, index) =>

        <p style={{background: '#71bbd4', marginTop: '0.5%', borderStyle: 'ridge'}} key={index}>{n.file.name}
            <Button className={"float-right"} id={index} variant="danger" size="sm" style={{height: 24}}
                    onClick={remove}>X</Button>
            <div style={{fontSize: "50%"}}>

                <input type={"number"} required placeholder="Quantity" onChange={(e) => {
                    files[index].quantity = e.target.value
                }}/>

                {/*Dropdown menu for material selection - Populated from array above*/}
                <select name="matOps"  onChange={(e)=>{
                    if(e.target.value >=0) {
                        files[index].Material=mat.material[e.target.value].matname
                        let arr= Object.assign([],matOption)
                        arr.splice(index,1,mat.material[e.target.value].process)
                        setMoption(arr)

                    }
                }} >
                    <option value={-1}>Select Material</option>
                    {mat.material.map((matOps,ind) =>
                        <option key={ind} value={ind}>{matOps.matname} ({matOps.mthickness}" )</option>
                    )}
                </select>


                {/*dropdown for process*/}
                <select onChange={(e)=>{

                    if(e.target.value !=-1){
                        files[index].process=matOption[index][e.target.value].procname
                    }
                }}>
                    <option value={-1}>Select Process</option>
                    { matOption.length>0 && matOption[index].map((pr,ind) =>
                        <option key={ind} value={ind}>{pr.procname}</option>
                    )}

                </select>


                <input type={"text"} required placeholder="Lead time" onChange={(e) => {
                    files[index].leadtime = e.target.value
                }}
                />

            </div>
        </p>
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
                            {pathname: '/quote',
                            state:{
                                quote:response.data,
                                filedata:files,
                                id:param.id
                            }}
                            )

                    },
                    function (error) {
                        // handle error
                        history.push(
                            {pathname: '/quoteError',
                                state:{
                                    message: error.message,
                                }}
                        )
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
        <div>
            <Navbar/>
            <div className='seller'>
                <div>
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



                        {submitBtn ?
                            <div>
                            <Loader
                            type="Circles"
                            color="#00BFFF"
                            height={100}
                            width={100}
                        />
                        <h1>Getting quotes...</h1>

                        </div>: null}

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
        </div>

    )

}