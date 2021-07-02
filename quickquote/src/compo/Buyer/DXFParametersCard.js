import React from 'react';
import {Card } from 'react-bootstrap'
import {CardHeader} from "reactstrap";
import DXFParametersForm from "./DXFParametersFrom"

function DXFParametersCard () {

    const DXFParametersCardStyle = {
        border:'groove',
        borderColor: '#000000',
        background: '#6d6e6e',
        alignItems: 'center',
        display: 'flex',
        width: '90vmin',
        height: 'auto',
        marginTop: '100px',
        marginBottom:'100px',
    }
    const DXFParametersCardHeaderStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        fontSize: '5vmin',
        fontWeight:'bold',
        background:'#232323',
        color: '#fff',
    }

    // constructor(props) {
    //     super(props);
    //     this.state = { username: '' };
    // }
    // myChangeHandler = (event) => {
    //     this.setState({username: event.target.value});
    // }
        return(
            <>
                <Card style={DXFParametersCardStyle}>
                    <CardHeader style={DXFParametersCardHeaderStyle}>DXF PARAMETERS CARD!!!!</CardHeader>
                    <DXFParametersForm />
                </Card>

            </>
        );

}

export default DXFParametersCard;