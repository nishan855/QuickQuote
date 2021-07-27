import {useLocation,useHistory} from 'react-router-dom'
import React, {useEffect, useState} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button} from "react-bootstrap";
import Navbar from "../compo/Navbar";
import {Auth} from "@aws-amplify/auth";
import uuid from 'react-uuid'
import DynamoConfig from "../DynamoConfig";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";

let AWS= require("aws-sdk");

function Orders(props){
    const location=useLocation()
    const history=useHistory()
    const quote=location.state.quote;
     const fdata= location.state.filedata;

     const ref=[];

    const notifyErr= () => {
        toast.error('Order Placement failed, Try again!!', {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    }

    const notifySucc= () => {
        toast.success('Order Successfully placed!!', {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    }

   //region and bucket name
    const S3_BUCKET ='dxfstorage-quickquote';
    const REGION ='us-east-2';



    AWS.config.update(DynamoConfig);

    //instance of s3
    const s3 = new AWS.S3();


    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    let sum=0;
    const getCost=()=>{
        quote.map((q)=> sum+=parseFloat(q.totalCost))
        return sum;
    }

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


    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }


   async function placeOrder() {


       const orderId= uuid();

       const data=[]


// fdata.map((fl)=>{
//
//     const key=orderId+"_"+fl.file.name
//
//        const params = {
//            Bucket: S3_BUCKET,
//            Key:key,
//            Body: fl.file,
//        };
//
//     ref.push(key)
//
//        const res = s3.putObject(params).promise().catch(err=>
//        notifyErr()
//        )
//
// });

quote.map((q,ind)=>{
    let obj={
        file:"",
        fileKey:"",
        material:"",
        process:"",
        quantity:"",
        thickness:"",
        cost:"",
    }

    obj.file=q.file
    obj.fileKey=ref[ind]
    obj.material=q.material
    obj.process=q.process
    obj.quantity=q.quantity
    obj.cost=q.totalCost

    data.push(obj)
})




        AWS.config.update(DynamoConfig);
        let DynamoDB = new AWS.DynamoDB.DocumentClient();


         const date=new Date().toLocaleString();
         var par = {
             TableName: "Orders",
             Item: {
                 "orderId": orderId,
                 //array of process
                 "orderDate": date,
                  "data":  data,
                 "totalCost":sum,
                 "sellerId": location.state.id
             }
         };

         DynamoDB.put(par, function (err) {
             if (err) {
                 notifyErr()
             }
             else{
                 notifySucc()

                 setTimeout(function() {
                     history.push('/')
                 }, 2000);

             }
         });

    }

    return (
            <div>
                <Navbar/>
            <TableContainer component={Paper} style={{marginTop:"2%",marginLeft:"0%"}}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>File</StyledTableCell>
                            <StyledTableCell align="right">Quantity</StyledTableCell>
                            <StyledTableCell align="right">Material</StyledTableCell>
                            <StyledTableCell align="right">Process</StyledTableCell>
                            <StyledTableCell align="right">Cost</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {quote.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.file}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.quantity}</StyledTableCell>
                                <StyledTableCell align="right">{row.material}</StyledTableCell>
                                <StyledTableCell align="right">{row.process}</StyledTableCell>
                                <StyledTableCell align="right">{row.totalCost}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>

                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Total</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right">{getCost()}</StyledTableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>

                <Button className={"float-right"}  variant="primary" size="sm"  onClick={placeOrder}>Place Order</Button>

                <ToastContainer
                    position="bottom-right"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        );


}
export default Orders;
