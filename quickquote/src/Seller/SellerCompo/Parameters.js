import React, {useEffect, useState} from 'react'
// import '../../button.css'
import  {Card,CardBody,CardHeader} from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Auth } from '@aws-amplify/auth';
import DynamoConfig from "../../DynamoConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Parameters.css'
import { useHistory } from "react-router-dom";

let AWS= require("aws-sdk");


const Parameters = () => {

    const val=[];
    let count=0;
    let savedpr = false;
    const InnerParams = () => {
        let proCount = 0;
        const [proceError,setProcErr] = useState(false);


        const notify = () => {
            toast.error('Please save or add  the process first!!', {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }

        const [mat, setMat] = useState({
            "matname": "",
            "mdensity": "0",
            "mthickness": "0",
            "msize": "0",
            "cutspd": "0",
            "lead": "0",
            "matCost": "0",
            "process": []
        });



        const proclst = [];


        const [inputList, setInputList] = useState([]);


        const Input = () => {
            const [processList, setProcessList] = useState([]);


            const Process = () => {
                const [processObj, setProcObj] = useState({
                    "procname": "",
                    "inch": "0",
                    "pierce": "0",
                    "setup": "0",
                    "kurf": "0"
                })

                const [saveProcessbtn, setSpBtn] = useState(false)

                const saveProcess = (proc) => {
                    proclst.push(proc)
                    setMat(prevState => ({
                        ...prevState,
                        process: proclst

                    }));
                    setSpBtn(true)
                    savedpr=true;
                    console.log(savedpr)
                }


                return (
                    <Card className = 'process-list-card'>
                        <CardHeader
                            className = 'process-list-card-header'
                        > Process {processList.length + 1} Available </CardHeader>
                        <Form className='process-list-form'>
                            <FormGroup>
                                <Label for="exampleEmail">Process Name</Label>
                                <input className = 'material-input-box' placeholder="input Process Name" defaultValue={""}
                                       onChange={(e) => {setProcObj(prevState => ({...prevState, procname: e.target.value}));}}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleEmail">Cut Cost</Label>
                                <input className = 'material-input-box' type={"number"} placeholder="input price $/inch" defaultValue={""}
                                       onChange={(e) => {setProcObj(prevState => ({...prevState, inch: e.target.value}));}}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleEmail">Pierce Cost</Label>
                                <input className = 'material-input-box' type={"number"} placeholder="input price $/ Pierce"
                                       defaultValue={""}
                                       onChange={(e) => {setProcObj(prevState => ({...prevState, pierce: e.target.value}));}}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleEmail">Set up Cost</Label>
                                <input className = 'material-input-box' type={"number"} placeholder="input Set up Cost" defaultValue={""}
                                       onChange={(e) => {setProcObj(prevState => ({...prevState, setup: e.target.value}));}}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleEmail">Process Kurf</Label>
                                <input className = 'material-input-box' placeholder="input Process Kurf" defaultValue={""}
                                       onChange={(e) => {setProcObj(prevState => ({...prevState, kurf: e.target.value}));}}
                                />
                            </FormGroup>

                            <Button className = 'save-process-button'
                                    disabled={saveProcessbtn}
                                    onClick={() => {saveProcess(processObj)}}
                            >Save Process</Button>
                        </Form>
                    </Card>
                )
            }

            function onProcessClick() {
                if (savedpr || (proCount == 0)) {
                    setProcessList(processList.concat(<Process key={processList.length}/>));
                    proCount++;
                    savedpr=false
                } else {
                    notify()
                }
            }

            return (
                <Card className='material-card'>
                    <CardHeader className = 'material-card-header'>
                        Material {val.length + 1} Setup
                    </CardHeader>
                    <div className = 'material-form-container'>
                        <FormGroup>
                            <Label for="exampleEmail">Material Name</Label>
                            <input className = 'material-input-box' placeholder="input Material Name" defaultValue={""}
                                   onChange={(e) => {
                                       setMat(prevState => ({...prevState, matname: e.target.value}));}}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleEmail">Material Density</Label>
                            <input className = 'material-input-box' type={"number"} placeholder="input Material Density " defaultValue={""}
                                   onChange={(e) => {
                                       setMat(prevState => ({...prevState, mdensity: e.target.value}));}}
                            />

                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleEmail">Material Thickness</Label>
                            <input className = 'material-input-box' type={"number"} placeholder="input thickness (inches)" defaultValue={""}
                                   onChange={(e) => {
                                       setMat(prevState => ({...prevState, mthickness: e.target.value}));}}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleEmail">Max Sizes</Label>
                            <input className = 'material-input-box' type={"number"} placeholder="input Max sizes (inches)" defaultValue={""}
                                   onChange={(e) => {setMat(prevState => ({...prevState,
                                           msize: e.target.value}));}}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Cut speeds</Label>
                            <input className = 'material-input-box' type={"number"} placeholder="input cut speed" defaultValue={""}
                                   onChange={(e) => {
                                       setMat(prevState => ({...prevState, cutspd: e.target.value}));}}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleEmail">Material cost </Label>
                            <input className = 'material-input-box' type={"number"} placeholder="input material cost ($/in^2)" defaultValue={""}
                                   onChange={(e) => {
                                       setMat(prevState => ({...prevState, matCost: e.target.value}));}}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleEmail">Lead In/ Lead Out distances</Label>
                            <input className = 'material-input-box' type={"number"} placeholder="input Lead in/out distances" defaultValue={""}
                                   onChange={(e) => {
                                       setMat(prevState => ({...prevState, lead: e.target.value}));
                                   }}/>
                        </FormGroup>

                        {processList}
                        <Button title="click to add process"
                                className='add-process-button'
                                onClick={onProcessClick}
                        >Add Process</Button>
                    </div>
                </Card>
            )
        };

        const onAddBtnClick = event => {

            console.log(count+" "+savedpr)
            if (count !=0 && !savedpr){
                console.log("n2 called")
                notify()
            }
            if (count != 0 && savedpr) {
                val.push(mat);
                console.log(val);
                savedpr = false;
                setInputList(<Input key={inputList.length}/>);
            }

            if(count==0){
                setInputList(<Input key={inputList.length}/>);
            }

            count++;


        };

        async function submitChange() {

            AWS.config.update(DynamoConfig);
            let DynamoDB = new AWS.DynamoDB.DocumentClient();

            //getting sub as user id
            const user = await Auth.currentAuthenticatedUser();
            console.log(user);
            const id = user.attributes.sub;

            var params = {
                TableName: "Test",
                Item: {
                    "t1": id,
                    //array of process
                    "material": val
                }
            };

            DynamoDB.put(params, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
        const history = useHistory();

        const handleRoute = () =>{
            history.push("/material");
        }

        const onsaveClick = () => {
            if (count !=0 && !savedpr){
                notify()
            }
            else {
                val.push(mat);
                console.log(val);
                submitChange()
                {handleRoute()}
            }
        };

        return (
            <div>
                {inputList}
                <div>
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

                    <button className="add-material-button" title="click to add more materials"
                            onClick={onAddBtnClick}
                    >Add Material (+)</button>
                    <button className = 'submit-material-button'
                            onClick={(event) => onsaveClick(event)}
                    >Submit</button>
                </div>
            </div>
        );
    }

    return(
        <div>
            <InnerParams/>
        </div>
    );
}
export default Parameters;