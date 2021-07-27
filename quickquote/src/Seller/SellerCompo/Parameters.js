import React, {useEffect, useState} from 'react'
import '../../button.css'
import  {Card,CardBody,CardHeader} from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Auth } from '@aws-amplify/auth';
import DynamoConfig from "../../DynamoConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                    <Card>
                        <CardHeader style={{
                            background: '#9DC88D',
                            marginBottom: '2%'
                        }}> Process {processList.length + 1} Available </CardHeader>
                        <Form>


                            <FormGroup>
                                <Label for="exampleEmail">Process Name</Label>
                                <input placeholder="input Process Name" defaultValue={""}
                                       onChange={(e) => {
                                           setProcObj(prevState => ({
                                               ...prevState,
                                               procname: e.target.value

                                           }));
                                       }}/>
                            </FormGroup>


                            <FormGroup>
                                <Label for="exampleEmail">Price per Inch</Label>
                                <input type={"number"} placeholder="input price $/inch" defaultValue={""}
                                       onChange={(e) => {
                                           setProcObj(prevState => ({
                                               ...prevState,
                                               inch: e.target.value

                                           }));
                                       }}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleEmail">Price per Pierce</Label>
                                <input type={"number"} placeholder="input price $/ Pierce"
                                       defaultValue={""}
                                       onChange={(e) => {

                                           setProcObj(prevState => ({
                                               ...prevState,
                                               pierce: e.target.value

                                           }));
                                       }}/>

                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleEmail">Set up Cost</Label>
                                <input type={"number"} placeholder="input Set up Cost" defaultValue={""}
                                       onChange={(e) => {
                                           setProcObj(prevState => ({
                                               ...prevState,
                                               setup: e.target.value

                                           }));
                                       }}/>
                            </FormGroup>


                            <FormGroup>
                                <Label for="exampleEmail">Process Kurf</Label>
                                <input placeholder="input Process Kurf" defaultValue={""}
                                       onChange={(e) => {
                                           setProcObj(prevState => ({
                                               ...prevState,
                                               kurf: e.target.value

                                           }));
                                       }}/>
                            </FormGroup>

                            <Button disabled={saveProcessbtn} onClick={() => {
                                saveProcess(processObj)
                            }}>Save Process</Button>

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
                <Card>
                    <CardHeader
                        style={{background: "#71bbd4", marginBottom: '2%'}}>Material {val.length + 1} Setup</CardHeader>
                    <FormGroup>
                        <Label for="exampleEmail">Material Name</Label>
                        <input placeholder="input Material Name" defaultValue={""}
                               onChange={(e) => {
                                   setMat(prevState => ({
                                       ...prevState,
                                       matname: e.target.value

                                   }));
                               }}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Material Density</Label>
                        <input type={"number"} placeholder="input Material Density " defaultValue={""}

                               onChange={(e) => {
                                   setMat(prevState => ({
                                       ...prevState,
                                       mdensity: e.target.value

                                   }));
                               }}/>

                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Material Thickness</Label>
                        <input type={"number"} placeholder="input Material Thickness" defaultValue={""}
                               onChange={(e) => {
                                   setMat(prevState => ({
                                       ...prevState,
                                       mthickness: e.target.value

                                   }));
                               }}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Max Sizes</Label>
                        <input type={"number"} placeholder="input Max sizes" defaultValue={""}
                               onChange={(e) => {
                                   setMat(prevState => ({
                                       ...prevState,
                                       msize: e.target.value

                                   }));
                               }}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Cut speeds</Label>
                        <input type={"number"} placeholder="Input cut speed" defaultValue={""}
                               onChange={(e) => {
                                   setMat(prevState => ({
                                       ...prevState,
                                       cutspd: e.target.value

                                   }));
                               }}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Material cost </Label>
                        <input type={"number"} placeholder="Input material cost" defaultValue={""}
                               onChange={(e) => {

                                   setMat(prevState => ({
                                       ...prevState,
                                       matCost: e.target.value

                                   }));
                               }}/>

                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Lead In/ Lead Out distances</Label>
                        <input type={"number"} placeholder="input Lead in/out distances" defaultValue={""}
                               onChange={(e) => {
                                   setMat(prevState => ({
                                       ...prevState,
                                       lead: e.target.value

                                   }));
                               }}/>
                    </FormGroup>

                    <Card>
                        {processList}


                        <Button title="click to add process" size="sm"
                                style={{background: '#9DC88D', marginBottom: '2%'}} onClick={onProcessClick}>Add Process
                        </Button>

                    </Card>

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


        const onsaveClick = () => {
            if (count !=0 && !savedpr){
                notify()
            }
            else {
                val.push(mat);
                console.log(val);
                submitChange()
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

                    <button className="button" title="click to add more materials"
                            style={{background: "#71bbd4", float: "left", marginTop: "2%"}} onClick={onAddBtnClick}>Add
                        Material (+)
                    </button>
                    <button class="savebutton"
                            onClick={(event) => onsaveClick(event)}> Submit
                    </button>
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