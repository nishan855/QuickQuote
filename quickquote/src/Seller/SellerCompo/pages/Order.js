import React, {useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import DynamoConfig from "../../../DynamoConfig";
import * as AWS from "aws-sdk";
import {Auth} from "@aws-amplify/auth";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button} from "react-bootstrap";
import Navbar from "../../../compo/Navbar";
import {NavLink} from "reactstrap";

function Order() {
const [dat,setDat]= useState([])
const [files,setFiles]=useState([])
const history=useHistory()

//region and bucket name
    const S3_BUCKET = 'dxfstorage-quickquote';
    const REGION = 'us-east-2';
    const s3 = new AWS.S3();

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 17,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);


    const useStyles = makeStyles({
        table: {
            minWidth: 700,
        },
    });

    const classes = useStyles();



    async  function fetch()
    {


        //getting sub as user id
        const user = await Auth.currentAuthenticatedUser();
        const id = user.attributes.sub;

        AWS.config.update(DynamoConfig);
        let docClient = new AWS.DynamoDB.DocumentClient();


        var params = {
            TableName: "Orders",
            FilterExpression: 'sellerId = :em',
            ExpressionAttributeValues: {
                ":em": id
            }
        };

        docClient.scan(params, function (err, data) {
            if (err) {
                console.log(err)
            } else {

                if (data.Items.length > 0) { // here is the info

                    let dt=data.Items
                    dt.sort(function(a,b){
                        return  new Date(b.orderDate) - new Date(a.orderDate);
                    });
                    setDat(dt);
                }

            }
        });
    }

    const ords= dat.map((dt,indx)=>
        <TableBody>
                <StyledTableRow key={dt.orderId}>
                    <StyledTableCell component="th" scope="row">
                       <NavLink onClick={()=>{
                           history.push(
                               {pathname: '/orderitem',
                                   state:{
                                       ordrData: dt,
                                   }}
                           )
                           }} > {dt.orderId}</NavLink>
                    </StyledTableCell>
                    <StyledTableCell align="right">{dt.orderDate}</StyledTableCell>
                    <StyledTableCell align="right">$ {dt.totalCost}</StyledTableCell>
                </StyledTableRow>
        </TableBody>
    )

    const keyDat=[];

    useEffect(()=>{
        fetch()


        // //setting filekey to array
        // dat.map((d)=> {
        //     const innerKey = [];
        //     d.data.map((dd) => {
        //
        //
        //         var params = {
        //             Bucket: S3_BUCKET,
        //             Key: dd.fileKey
        //         };
        //         s3.getObject(params, function (err, data) {
        //             if (err) console.log(err, err.stack); // an error occurred
        //             else {
        //                 console.log(data)
        //                 innerKey.push(data)
        //             };
        //         })
        //
        //
        //
        //     })
        //     keyDat.push(innerKey);
        //     setFiles(keyDat)
        //     console.log(keyDat)
        //     console.log(files)
        // })


    },[])
    return (
        <div style={{marginLeft:'5%',marginTop:'2%'}}>
            <TableContainer component={Paper} style={{marginTop:"2%",marginLeft:"0%"}}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>OrderId</StyledTableCell>
                            <StyledTableCell align="center">Date</StyledTableCell>
                            <StyledTableCell align="right">Cost</StyledTableCell>
                        </TableRow>
                    </TableHead>

            {ords}

                </Table>
            </TableContainer>
        </div>
    );
}

export default Order;