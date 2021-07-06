import React, {useEffect, useState} from 'react'
import '../App.css'
import '../button.css'
import  {Card,CardBody,CardHeader} from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Auth } from '@aws-amplify/auth';
import MultiSelect from "react-multi-select-component";
import DynamoConfig from "../DynamoConfig";
import {Toast, ToastBody} from "react-bootstrap";


let AWS= require("aws-sdk");


//
//function Parametes() {


//}

//
//
//
//
//     //process options
//     const options = [
//         { value: 'Laser', label: 'Laser' },
//         { value: 'Waterjet', label: 'Waterjet' },
//         { value: 'Plasma', label: 'Plasma' },
//     ];
//
//
//
//     const handleChange = selectedOption => {
//         console.log(`Option selected:`, selectedOption);
//     };
//
//     async function submitChange(){
//
//         AWS.config.update(DynamoConfig);
//          let DynamoDB = new AWS.DynamoDB.DocumentClient();
//
//         var params = {
//             TableName: "Test",
//             Item: {
//                 "t1":"123",
//                 //array of process
//                 "material": [
//                     //material object 1
//                     {   "matname":"Aluminium",
//
//                         //array of process obj
//                         "process":[
//
//                      //process obj 1
//                     {
//                         "procname":"WaterJet",
//                         "cutCost": "120",
//                     },
//                             //process obj 2
//                     {
//                         "procname": "Laser",
//                         "cutCost": "20"
//                     },
//
//                 ]
//                     },
//
//
//                     //material object 2
//                     {   "matname":"Copper",
//                         "process":[
//
//                             //process obj 1
//                             {
//                                 "procname":"WaterJet",
//                                 "cutCost": "120",
//                             },
//                             //process obj 2
//                             {
//                                 "procname": "Laser",
//                                 "cutCost": "20"
//                             },
//
//                         ]
//                     }
//
//
//         ]
//             }
//         };
//
//         DynamoDB.put(params, function (err) {
//             if (err) {
//                 console.log(err);
//             }
//
//             //this is put
//         });
//
//
//         }
//
//     // async function submitChange(){
//     //     const process=[];
//     //     selected.map((element)=>process.push(element.label));
//     //
//     //
//     //     // await Auth.currentAuthenticatedUser().then((data)=>setSub(data.attributes.sub));
//     //     // console.log(sub+"got");
//     //
//     //     //getting sub as user id
//     //     const user=  await Auth.currentAuthenticatedUser();
//     //     console.log(user);
//     //     const id= user.attributes.sub;
//     //
//     //     //writting to DB
//     //     AWS.config.update(DynamoConfig);
//     //     let docClient = new AWS.DynamoDB.DocumentClient();
//     //
//     //     var input = {
//     //         "id": id, "areaCost": areaC, "cutCost":cutC, "material":"111","pierceCost":piercePC, "process":process,setupCost:setUpC
//     //     };
//     //     var params = {
//     //         TableName: "Seller",
//     //         Item:  input
//     //     };
//     //     docClient.put(params, function (err, data) {
//     //
//     //         if (err) {
//     //             console.log("users::save::error "+JSON.stringify(err, null, 2));
//     //         } else {
//     //             console.log("users::save::success" + JSON.stringify(data, null, 2));
//     //         }
//     //     });
//     // }
//
//
//
//     return (<Form>
//
//         <Card>
//     <CardHeader style={{background:"#71bbd4"}}>Process Available</CardHeader>
//     <CardBody>
//             <MultiSelect
//                 options={options}
//                 value={selected}
//                 onChange={setSelected}
//                 labelledBy="Select"
//             />
//     </CardBody>
//     </Card>
//
//         <Card style={{marginTop:"2%"}}>
//             <CardHeader style={{background:"#71bbd4"}}>Materials and Costs</CardHeader>
//             <CardBody>
//         <FormGroup>
//             <Label for="exampleEmail">Material Cost</Label>
//             <input className="mb-4" type="number" required value={areaC}
//                    onChange={(e) => setareaC(e.target.value)}
//                    />
//         </FormGroup>
//
//         <FormGroup>
//             <Label for="exampleEmail">Cut Cost</Label>
//             <input className="mb-4" type="number" required value={cutC}
//                    onChange={(e) => setCutc(e.target.value)}
//                    />
//         </FormGroup>
//
//         <FormGroup>
//             <Label for="exampleEmail">Pierce Point Cost</Label>
//             <input className="mb-4" type="number" required value={piercePC}
//                    onChange={(e) => setPiercePc(e.target.value)}
//                    />
//         </FormGroup>
//
//         <FormGroup>
//             <Label for="exampleEmail">Set up Cost</Label>
//             <input className="mb-4" type="number" required value={setUpC}
//                    onChange={(e) => setSetUpc(e.target.value)}
//                    />
//         </FormGroup>
//
//             </CardBody>
//         </Card>
//
//         <Button onClick={submitChange}>Submit</Button>
//
//     </Form>);
//
//
// }
//  export default  Parameters;
//
//
//








const Parameters = () => {

    const val=[];
    let count=0;
    const InnerParams = () => {
        let proCount = 0;
        let savedpr = false;
        const [proceError,setProcErr] = useState(false);

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
        //const [processList, setProcessList] = useState([]);


        const Input = () => {
            const [processList, setProcessList] = useState([]);

            savedpr = false;

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
                    savedpr = true;
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
                                <input placeholder="input Process Name" defaultValue={processObj.procname}
                                       onChange={(e) => {
                                           setProcObj(prevState => ({
                                               ...prevState,
                                               procname: e.target.value

                                           }));
                                       }}/>
                            </FormGroup>


                            <FormGroup>
                                <Label for="exampleEmail">Price per Inch</Label>
                                <input type={"number"} placeholder="input price $/inch" defaultValue={processObj.inch}
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
                                       defaultValue={processObj.pierce}
                                       onChange={(e) => {

                                           setProcObj(prevState => ({
                                               ...prevState,
                                               pierce: e.target.value

                                           }));
                                       }}/>

                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleEmail">Set up Cost</Label>
                                <input type={"number"} placeholder="input Set up Cost" defaultValue={processObj.setup}
                                       onChange={(e) => {
                                           setProcObj(prevState => ({
                                               ...prevState,
                                               pierce: e.target.value

                                           }));
                                       }}/>
                            </FormGroup>


                            <FormGroup>
                                <Label for="exampleEmail">Process Kurf</Label>
                                <input placeholder="input Process Kurf" defaultValue={processObj.kurf}
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
                console.log(savedpr)
                console.log(proCount)
                if (savedpr || (proCount == 0)) {
                    setProcessList(processList.concat(<Process key={processList.length}/>));
                    proCount++;
                    setProcErr(false)
                } else setProcErr(true)

            }

            return (
                <Card>
                    <CardHeader
                        style={{background: "#71bbd4", marginBottom: '2%'}}>Material {val.length + 1} Setup</CardHeader>
                    <FormGroup>
                        <Label for="exampleEmail">Material Name</Label>
                        <input placeholder="input Material Name" defaultValue={mat.matname}
                               onChange={(e) => {
                                   setMat(prevState => ({
                                       ...prevState,
                                       matname: e.target.value

                                   }));
                               }}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Material Density</Label>
                        <input type={"number"} placeholder="input Material Density " defaultValue={mat.mdensity}

                               onChange={(e) => {
                                   setMat(prevState => ({
                                       ...prevState,
                                       mdensity: e.target.value

                                   }));
                               }}/>

                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Material Thickness</Label>
                        <input type={"number"} placeholder="input Material Thickness" defaultValue={mat.mthickness}
                               onChange={(e) => {
                                   setMat(prevState => ({
                                       ...prevState,
                                       mthickness: e.target.value

                                   }));
                               }}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Max Sizes</Label>
                        <input type={"number"} placeholder="input Max sizes" defaultValue={mat.msize}
                               onChange={(e) => {
                                   setMat(prevState => ({
                                       ...prevState,
                                       msize: e.target.value

                                   }));
                               }}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Cut speeds</Label>
                        <input type={"number"} placeholder="Input cut speed" defaultValue={mat.cutspd}
                               onChange={(e) => {
                                   setMat(prevState => ({
                                       ...prevState,
                                       cutspd: e.target.value

                                   }));
                               }}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Material cost </Label>
                        <input type={"number"} placeholder="Input material cost" defaultValue={mat.matCost}
                               onChange={(e) => {

                                   setMat(prevState => ({
                                       ...prevState,
                                       matCost: e.target.value

                                   }));
                               }}/>

                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Lead In/ Lead Out distances</Label>
                        <input type={"number"} placeholder="input Lead in/out distances" defaultValue={mat.lead}
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
            if (count != 0) {
                val.push(mat);
                console.log(val);
            }
            count++;
            savedpr = 0;


            setInputList(<Input key={inputList.length}/>);


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


        const onsaveClick = () => {
            val.push(mat);
            console.log(val);
            submitChange()
        };


        return (
            <div>

                {inputList}
                <div>
                    <button className="button" title="click to add more materials"
                            style={{background: "#71bbd4", float: "left", marginTop: "2%"}} onClick={onAddBtnClick}>Add
                        Material (+)
                    </button>
                    <button class="savebutton" style={{float: "right"}}
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