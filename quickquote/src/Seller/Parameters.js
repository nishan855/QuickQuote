import React, {useEffect, useState} from 'react'
import '../App.css'
import '../button.css'
import {Card,CardBody,CardHeader} from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Auth } from '@aws-amplify/auth';
import MultiSelect from "react-multi-select-component";
import DynamoConfig from "../DynamoConfig";


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


    const [input, setInput] = useState("");
    const [materialdensity, setmaterialdensity] = useState(0);
    const [materialthickness, setmaterialthickness] = useState(0);
    const [maxsize, setmaxsize] = useState(0);
    const [cutspeeds, setcutspeeds] = useState(0);
    const [leadin, setleadin] = useState(0);
    const [materialcost, materialsetcost] = useState(0);

    const obj=[];

    const [mat,setMat]= useState({
          "matname":"",
          "mdensity":0,
          "mthickness":0,
           "msize":0,
           "cutspd":0,
           "lead":0,
            "matCost":0,

          //  "process":[ ]
    });

    const [processObj,setProcObj]=useState({
        "procname":"",
         "inch":0,
         "pierce":0,
          "setup":0,
          "kurf":0
    })

    const [proc, setProc] = useState([]);
    const [selected, setSelected] = useState([]);

    const proclst=[];

    const [inputList, setInputList] = useState([]);
    //const [processList, setProcessList] = useState([]);



    const Input = () => {
        const [processList, setProcessList] = useState([]);



        const Process =()=>{

            const [process, setprocess] = useState("");
            const [perinch, setperinch] = useState(0);
            const [perpierce, setperpierce] = useState(0);
            const [setcost, setupcost] = useState(0);
            const [processkurf, setprocesskurf] = useState("");

            const saveProcess=()=>{
                setProcObj({
                    "procname":process,
                    "inch":perinch,
                    "pierce":perpierce,
                    "setup":setcost,
                    "kurf":processkurf
                })
                proclst.push(processObj);
            }
            return(
                <Card>
                    <CardHeader style={{background:"#71bbd4"}}> Process {processList.length+1} Available </CardHeader>
                    <Form>


                        <FormGroup>
                            <Label for="exampleEmail">Process Name</Label>
                            <input placeholder="input Process Name" defaultValue={processObj.procname}
                                   onChange={(e) => {
                                       {
                                           let proctemp =processObj;
                                           proctemp.procname= e.target.value;
                                           setProcObj({proctemp})}}
                                   }/>
                        </FormGroup>



                        <FormGroup>
                            <Label for="exampleEmail">Price per Inch</Label>
                            <input type={"number"} placeholder="input price $/inch" defaultValue={processObj.inch}
                                   onChange={(e) => {
                                       {
                                           let proctemp =processObj;
                                           proctemp.inch= e.target.value;
                                           setProcObj({proctemp})}}
                                   } />
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleEmail">Price per Pierce</Label>
                            <input  type={"number"} placeholder="input price $/ Pierce" defaultValue={processObj.pierce}
                                    onChange={(e) => {
                                        {
                                            let proctemp =processObj;
                                            proctemp.pierce= e.target.value;
                                            setProcObj({proctemp})}}
                                    }/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleEmail">Set up Cost</Label>
                            <input type={"number"} placeholder="input Set up Cost" defaultValue={processObj.setup}
                                   onChange={(e) => {
                                       {
                                           let proctemp =processObj;
                                           proctemp.setup= e.target.value;
                                           setProcObj({proctemp})}}
                                   }/>
                        </FormGroup>




                        <FormGroup>
                            <Label for="exampleEmail">Process Kurf</Label>
                            <input placeholder="input Process Kurf" defaultValue={processObj.kurf}
                                   onChange={(e) => {
                                       {
                                           let proctemp =processObj;
                                           proctemp.kurf= e.target.value;
                                           setProcObj({proctemp})}}
                                   }/>
                        </FormGroup>

                        <Button onClick={saveProcess}>Save Process</Button>

                    </Form>
                </Card>
            )
        }




        function onProcessClick() {
            setProcessList(processList.concat(<Process key={processList.length} />));

        }

        return(
            <Card>
            <FormGroup>
                <Label for="exampleEmail">Material Name</Label>
                <input placeholder="input Material Name" defaultValue={mat.matname}
                       onChange={(e) =>{
                           let mattemp =mat;
                           mattemp.matname= e.target.value;
                           setMat({ mattemp})}}/>
            </FormGroup>

        <FormGroup>
            <Label for="exampleEmail">Material Density</Label>
            <input type={"number"} placeholder="input Material Density " defaultValue={mat.mdensity}

                   onChange={(e) => {
                       let mattemp =mat;
                       mattemp.mdensity= e.target.value;
                       setMat({mattemp})}}/>

        </FormGroup>

        <FormGroup>
            <Label for="exampleEmail">Material Thickness</Label>
            <input type={"number"} placeholder="input Material Thickness" defaultValue={mat.mthickness}
                   onChange={(e) => {
                       let mattemp =mat;
                       mattemp.mthickness= e.target.value;
                       setMat({ mattemp})}}/>
        </FormGroup>

        <FormGroup>
            <Label for="exampleEmail">Max Sizes</Label>
            <input type={"number"} placeholder="input Max sizes" defaultValue={mat.msize}
                   onChange={(e) => {
                       let mattemp =mat;
                       mattemp.msize= e.target.value;
                       setMat({ mattemp})}} />
        </FormGroup>

        <FormGroup>
            <Label for="exampleEmail">Cut speeds</Label>
            <input type={"number"} placeholder="Input cut speed" defaultValue={mat.cutspd}
                   onChange={(e) => {
                       let mattemp =mat;
                       mattemp.cutspd= e.target.value;
                       setMat({mattemp})}}

            />
        </FormGroup>

        <FormGroup>
            <Label for="exampleEmail">Material cost </Label>
            <input type={"number"} placeholder="Input material cost" defaultValue={mat.matCost}
                   onChange={(e) => {
                       let mattemp =mat;
                       mattemp.matCost= e.target.value;
                       setMat({mattemp})}} />
        </FormGroup>

        <FormGroup>
            <Label for="exampleEmail">Lead In/ Lead Out distances</Label>
            <input type={"number"} placeholder="input Lead in/out distances" defaultValue={mat.lead}
                   onChange={(e) => {
                       let mattemp =mat;
                       mattemp.lead= e.target.value;
                       setMat({mattemp})}}/>
        </FormGroup>

        <button class = "addprocessbutton" title="click to add process for above material" onClick={onProcessClick}>Add Process</button>
        {processList}
    </Card>
        )
    };

    const onAddBtnClick = event => {
        setInputList(inputList.concat(<Input key={inputList.length} />));
    };

    console.log(mat);
    console.log(processObj);


    const onsaveClick = event => {
        setMat({matname:input,
            mdensity:materialdensity,
            mthickness:materialthickness,
            msize:maxsize,
            cutspd:cutspeeds,
            lead:leadin,
            matCost:materialcost,
            //process:proclst
        })
        console.log(mat)

        alert("material has been added successfully");

    };


    return (
        <div>
            <button class = "button" title="click to add more materials" onClick={onAddBtnClick}>Add Material (+) </button>

            {inputList}


            <button class = "savebutton" onClick={onsaveClick}> Save material </button>
        </div>
    );
};
export default Parameters;

