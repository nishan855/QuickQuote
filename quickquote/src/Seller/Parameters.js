import React, {useState} from 'react'
import '../App.css'
import {Card,CardBody,CardHeader} from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Auth } from '@aws-amplify/auth';
import MultiSelect from "react-multi-select-component";
import DynamoConfig from "../DynamoConfig";


 let AWS= require("aws-sdk");



function Parameters(){
    const[areaC,setareaC]=useState(0);
    const[cutC,setCutc]=useState(0);
    const[setUpC,setSetUpc]=useState(0);
    const[piercePC,setPiercePc]=useState(0);

    const[sub, setSub]=useState("");
    const[proc,setProc]= useState([]);
    const [selected, setSelected] = useState([]);




    //process options
    const options = [
        { value: 'Laser', label: 'Laser' },
        { value: 'Waterjet', label: 'Waterjet' },
        { value: 'Plasma', label: 'Plasma' },
    ];



    const handleChange = selectedOption => {
        console.log(`Option selected:`, selectedOption);
    };



    async function submitChange(){
        const process=[];
        selected.map((element)=>process.push(element.label));


        // await Auth.currentAuthenticatedUser().then((data)=>setSub(data.attributes.sub));
        // console.log(sub+"got");

        //getting sub as user id
        const user=  await Auth.currentAuthenticatedUser();
        console.log(user);
        const id= user.attributes.sub;

        //writting to DB
        AWS.config.update(DynamoConfig);
        let docClient = new AWS.DynamoDB.DocumentClient();

        var input = {
            "id": id, "areaCost": areaC, "cutCost":cutC, "material":"111","pierceCost":piercePC, "process":process,setupCost:setUpC
        };
        var params = {
            TableName: "Seller",
            Item:  input
        };
        docClient.put(params, function (err, data) {

            if (err) {
                console.log("users::save::error "+JSON.stringify(err, null, 2));
            } else {
                console.log("users::save::success" + JSON.stringify(data, null, 2));
            }
        });
    }



    return (<Form>

        <Card>
    <CardHeader style={{background:"#71bbd4"}}>Process Available</CardHeader>
    <CardBody>
            <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
            />
    </CardBody>
    </Card>

        <Card style={{marginTop:"2%"}}>
            <CardHeader style={{background:"#71bbd4"}}>Materials and Costs</CardHeader>
            <CardBody>
        <FormGroup>
            <Label for="exampleEmail">Material Cost</Label>
            <input className="mb-4" type="number" required value={areaC}
                   onChange={(e) => setareaC(e.target.value)}
                   />
        </FormGroup>

        <FormGroup>
            <Label for="exampleEmail">Cut Cost</Label>
            <input className="mb-4" type="number" required value={cutC}
                   onChange={(e) => setCutc(e.target.value)}
                   />
        </FormGroup>

        <FormGroup>
            <Label for="exampleEmail">Pierce Point Cost</Label>
            <input className="mb-4" type="number" required value={piercePC}
                   onChange={(e) => setPiercePc(e.target.value)}
                   />
        </FormGroup>

        <FormGroup>
            <Label for="exampleEmail">Set up Cost</Label>
            <input className="mb-4" type="number" required value={setUpC}
                   onChange={(e) => setSetUpc(e.target.value)}
                   />
        </FormGroup>

            </CardBody>
        </Card>

        <Button onClick={submitChange}>Submit</Button>

    </Form>);


}
 export default  Parameters;



