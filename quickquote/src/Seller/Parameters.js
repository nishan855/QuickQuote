import React, {useState} from 'react'
import '../App.css'
import {Card} from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const submitChange=()=>{


}

function Parameters(){
    const[areaC,setareaC]=useState(0);
    const[cutC,setCutc]=useState(0);
    const[setUpC,setSetUpc]=useState(0);
    const[piercePC,setPiercePc]=useState(0);

    return (<Form>
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

        <Button>Submit</Button>
    </Form>);


}
 export default  Parameters;



