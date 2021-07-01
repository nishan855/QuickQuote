import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button} from 'react-bootstrap'
import Dropzone from "react-dropzone";
import React, {useEffect, useState} from "react";
import {CardHeader, CardTitle} from "reactstrap";
import axios from "axios";
import Server  from "../compo/Server";
import Navbar from "../compo/Navbar";
import DragDropCard from "../compo/Buyer/DragDropCard";
import DXFParametersCard from "../compo/Buyer/DXFParametersCard";

export default function Buyer () {


    return (
        <>
            <Navbar/>
            <h1> HEY Team Laminar! </h1>
            <DragDropCard/>
            <DXFParametersCard/>
        </>

    );

}