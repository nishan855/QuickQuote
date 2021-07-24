import {useLocation} from 'react-router-dom'
import React, {useEffect} from "react";
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

function Orders(props){
    const location=useLocation()
    const quote=location.state.quote;
    const fdata= location.state.filedata;

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

                <Button className={"float-right"}  variant="primary" size="sm" >Place Order</Button>
            </div>
        );


}
export default Orders;
