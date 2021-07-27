import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import * as AWS from "aws-sdk";
import DynamoConfig from "../../DynamoConfig";
import {useParams} from "react-router-dom";


function DisplayComponent (files) {

    const userParam = useParams()
    const [mat, setMat] = useState([]);
    const [matOps, setMatOps] = useState([]);
    const [procOps, setProcOps] = useState([{label: "select process", value: "_default"}]);

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
        fetch()
        if (mat.length != 0) {
            console.log(mat)
            console.log(mat.material.length)
            updateMaterialOptions();
        } else
            console.log("Mat Empty")
    }, [mat.length]);   // Not sure what this does. Seems to update only when 'mat' has values.

    function updateMaterialOptions() {
        console.log("updating MaterialOptions...")
        const matL = mat.material.length;
        let materialOptions = [{label: "select material", value: "_default"}];
        if (matL > 0) {
            for (let i = 0; i < matL; i++) {
                const matName = mat.material[i].matname;
                materialOptions.push({label: matName, value: matName})
            }
        }
        setMatOps(materialOptions); // Update array that shows in dropdown menu
    }

    function processOptionChange(e, index) {
        files[index].Material = e.target.value
        console.log("Changing target!");
        updateProcessOptions(e, index);
        // files[this.index].material = this.e.target.value;
    }

    function updateProcessOptions(e) {
        let processOptions = [{label: "select process", value: "_default"}];
        console.log("Updating Process Options!");
        let currSel = e.target.value;
        let matIndex = -1;
        console.log("Based on Current Selection: " + currSel);
        for (let i = 0; i < mat.material.length; i++) {
            if (mat.material[i].matname == currSel) {
                console.log("Found: " + mat.material[i].matname + " -  Index: " + i)
                matIndex = i;
                break;
            }
        }
        if (matIndex != -1) {
            const procL = mat.material[matIndex].process.length;
            console.log("Process Length: " + procL);
            for (let i = 0; i < procL; i++) {
                const procName = mat.material[matIndex].process[i].procname;
                processOptions.push({label: procName, value: procName})
            }
        } else {
            console.log("No material found!");
        }
        setProcOps(processOptions); // Update array that shows in dropdown menu
    }

    // const remove = event => {
    //     const name = event.target.getAttribute("id")
    //
    //     const newList = Object.assign([], files);
    //     newList.splice(name, 1);
    //     setFiles(newList);
    // }

    const display = Array.from(files).map((n, index) =>

        <p className='display-paragraph' key={index}>{n.file.name}
            {/*<Button className={"float-right"} id={index} variant="danger" size="sm" style={{height: 24}}*/}
            {/*        onClick={remove}>X</Button>*/}
            <div style={{fontSize: "50%"}}>

                <input type={"number"} required placeholder="Quantity" onChange={(e) => {
                    files[index].quantity = e.target.value
                }}/>

                {/*Dropdown menu for material selection - Populated from array above*/}
                <select name="matOps" onChange={(e) => {
                    processOptionChange(e, index)
                }}>
                    {matOps.map((matOps) => (
                        <option value={matOps.value}>{matOps.label}</option>
                    ))}
                </select>

                {/*Dropdown menu for Process Selection*/}
                <select onChange={(e) => {
                    files[index].process = e.target.value
                }}>
                    {procOps.map((procOps) => (
                        <option value={procOps.value}>{procOps.label}</option>
                    ))}
                </select>

                <input type={"text"} required placeholder="Lead time" onChange={(e) => {
                    files[index].leadtime = e.target.value
                }}
                />
            </div>
        </p>
    )
    return display
}

export default DisplayComponent