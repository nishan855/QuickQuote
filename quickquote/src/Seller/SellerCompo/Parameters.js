import React, {useEffect, useState} from 'react'
import '../../button.css'
import './SellerDashBoard.css'
import  {Card,CardBody,CardHeader} from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Auth } from '@aws-amplify/auth';
import DynamoConfig from "../../DynamoConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            "mdensity": 0,
            "mthickness": 0,
            "msize": 0,
            "cutspd": 0,
            "lead": 0,
            "matCost": 0,
            "process": []
        });



        const proclst = [];


        const [inputList, setInputList] = useState([]);


        const Input = () => {
            const [processList, setProcessList] = useState([]);


            const Process = () => {
                const [processObj, setProcObj] = useState({
                    "procname": "",
                    "inch": 0,
                    "pierce": 0,
                    "setup": 0,
                    "kurf": 0
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
                    <div className= "component">
                        <Card>
                            <CardHeader
                                style={{background: '#9DC88D', marginBottom: '2%'}}>Process {val.length + 1} Available</CardHeader>
                            <div className= "material">
                                <FormGroup>
                                    <Label for="exampleEmail" style={{ marginRight: "30%", marginLeft:"6%"}}>Process Name</Label><span></span>
                                    <input placeholder=" Input Process Name" style={{width: "85%", marginRight: "80%",marginLeft:"6%"}} defaultValue={processObj.procname}
                                           onChange={(e) => {
                                               setProcObj(prevState => ({
                                                   ...prevState,
                                                   procname: e.target.value

                                               }));
                                           }}/>
                                </FormGroup>
                                <span></span>

                                <FormGroup>
                                    <Label for="exampleEmail" style={{marginLeft:"6%"}}>Price per Inch </Label><span></span>
                                    <input type={"number"} placeholder = " Input price $/inch" style={{width: "85%", marginRight: "80%",marginLeft:"6%"}} defaultValue={processObj.inch}

                                           onChange={(e) => {
                                               setProcObj(prevState => ({
                                                   ...prevState,
                                                   inch: e.target.value

                                               }));
                                           }}/>

                                </FormGroup>

                                <FormGroup>
                                    <Label for="exampleEmail" style={{marginLeft:"6%"}}>Price per Pierce </Label><span></span>
                                    <input type={"number"} placeholder=" Input price $/ Pierce" style={{width: "85%", marginRight: "80%",marginLeft:"6%"}} defaultValue={processObj.pierce}
                                           onChange={(e) => {
                                               setProcObj(prevState => ({
                                                   ...prevState,
                                                   pierce: e.target.value

                                               }));
                                           }}/>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="exampleEmail" style={{marginLeft:"6%"}}>Set up Cost</Label><span></span>
                                    <input type={"number"} placeholder=" Input Set up Cost" style={{width: "85%", marginRight: "80%",marginLeft:"6%"}} defaultValue={processObj.setup}
                                           onChange={(e) => {
                                               setProcObj(prevState => ({
                                                   ...prevState,
                                                   setup: e.target.value

                                               }));
                                           }}/>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="exampleEmail" style={{marginLeft:"6%"}}>Process Kurf</Label><span></span>
                                    <input type={"number"} placeholder=" Input Process Kurf"  style={{width: "85%", marginRight: "80%",marginLeft:"6%"}} defaultValue={processObj.kurf}
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



                            </div>
                        </Card>

                    </div>
                )
            };


            function onProcessClick() {
                if (savedpr || (proCount == 0)) {
                    setProcessList(processList.concat(<Process key={processList.length}/>));
                    proCount++;
                    savedpr=false
                } else {
                    notify()
                    console.log("n1 called")
                }

            }

            return (

                <div className= "component">
                    <div classNme = "materialinfo">
                    <Card>
                        <CardHeader
                            style={{background: "#71bbd4", marginBottom: '2%'}}>Material {val.length + 1} Setup</CardHeader>
                        <div className= "material">
                            <FormGroup>
                                <Label for="exampleEmail">Material Name</Label><span></span>
                                <input placeholder=" Input Material Name" defaultValue={mat.matname}
                                       onChange={(e) => {
                                           setMat(prevState => ({
                                               ...prevState,
                                               matname: e.target.value

                                           }));
                                       }}/>
                            </FormGroup><span></span>
                            <FormGroup>
                                <Label for="exampleEmail">Material Density</Label><span></span>
                                <input type={"number"} placeholder="input Material Density " defaultValue={mat.mdensity}

                                       onChange={(e) => {
                                           setMat(prevState => ({
                                               ...prevState,
                                               mdensity: e.target.value

                                           }));
                                       }}/>

                            </FormGroup><span></span>

                            <FormGroup>
                                <Label for="exampleEmail">Material Thickness</Label><span></span>
                                <input type={"number"} placeholder="input Material Thickness" defaultValue={mat.mthickness}
                                       onChange={(e) => {
                                           setMat(prevState => ({
                                               ...prevState,
                                               mthickness: e.target.value

                                           }));
                                       }}/>
                            </FormGroup><span></span>

                            <FormGroup>
                                <Label for="exampleEmail">Max Sizes</Label><span></span>
                                <input type={"number"} placeholder="input Max sizes" defaultValue={mat.msize}
                                       onChange={(e) => {
                                           setMat(prevState => ({
                                               ...prevState,
                                               msize: e.target.value

                                           }));
                                       }}/>
                            </FormGroup><span></span>

                            <FormGroup>
                                <Label for="exampleEmail">Cut speeds</Label><span></span>
                                <input type={"number"} placeholder="Input cut speed" defaultValue={mat.cutspd}
                                       onChange={(e) => {

                                           setMat(prevState => ({
                                               ...prevState,
                                               cutspd: e.target.value

                                           }));
                                       }}/>
                            </FormGroup><span></span>

                            <FormGroup>
                                <Label for="exampleEmail">Material cost </Label><span></span>
                                <input type={"number"} placeholder="Input material cost" defaultValue={mat.matCost}
                                       onChange={(e) => {

                                           setMat(prevState => ({
                                               ...prevState,
                                               matCost: e.target.value

                                           }));
                                       }}/>

                            </FormGroup><span></span>

                            <FormGroup>
                                <Label for="exampleEmail">Lead In/Out distances</Label><span></span>
                                <input type={"number"} placeholder=" Input Lead in/out distances" defaultValue={mat.lead}
                                       onChange={(e) => {
                                           setMat(prevState => ({
                                               ...prevState,
                                               lead: e.target.value

                                           }));
                                       }}/>
                            </FormGroup><span></span>

                        </div>
                        <Card>
                            {processList}

                            <div className= "btn">
                                <Button title="click to add process" size="sm"
                                        style={{background: '#9DC88D', marginBottom: '2%'}} onClick={onProcessClick}>Add Process
                                </Button>

                            </div>

                        </Card>


                    </Card>
                    </div>
                </div>
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

                //this is put
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
                submitChange();
                {handleRoute()}
            }
        };


        return (
            <div className= "component">

                {inputList}
                <div>
                    <ToastContainer
                        position="bottom-left"
                        autoClose={2500}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />

                    <div className = "add">
                        <button className="button" title="click to add more materials"
                                style={{background: "#71bbd4", marginLeft: "40%"}} onClick={onAddBtnClick}>Add
                            Material (+)
                        </button>

                        <button className="savebutton" style={{marginLeft: "2%"}}
                                onClick={(event) => onsaveClick(event)}> Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return(
        <div className= "component">
            <InnerParams/>
        </div>
    );
};
export default Parameters;