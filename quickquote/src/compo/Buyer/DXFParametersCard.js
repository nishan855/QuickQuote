import React from 'react';
import {Card } from 'react-bootstrap'
import {CardHeader} from "reactstrap";
import DXFParametersForm from "./DXFParametersForm"
import "./DXFParametersCard.css"

function DXFParametersCard () {

        return(
            <>
                <Card className = 'DXF-parameters-card'>
                    <CardHeader className ='DXF-parameters-card-header'>DXF PARAMETERS CARD!!!!</CardHeader>
                    <DXFParametersForm />
                </Card>

            </>
        );
}

export default DXFParametersCard;