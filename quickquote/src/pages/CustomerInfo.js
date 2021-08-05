import DXFParametersCard from "../compo/Buyer/DXFParametersCard";
import Navbar from "../compo/Navbar";
import {Button, Card} from "react-bootstrap";
import {CardHeader} from "reactstrap";
import DXFParametersForm from "../compo/Buyer/DXFParametersFrom";
import React, {useEffect} from "react";
import custInfo from "./custInfo.css"
import {useState} from 'react'
import {useLocation,useHistory} from "react-router-dom"
import DynamoConfig from "../DynamoConfig";
import uuid from "react-uuid";
import {toast} from "react-toastify";
import Payment from "./Payment";
export default function CustomerInfo(){

    let AWS= require("aws-sdk");

    const history=useHistory()

    const [name,setName]=useState("")
    const [phone,setPhone]=useState("")
    const [email,setEmail]=useState("")
    const [addr,setaddr]=useState("")
    const [city,setCity]=useState("")
    const [state,setState]=useState("")
    const [zip,setZip]=useState("")
    const [err,setErr]=useState(false)
    const[prc,setPrc]=useState(0)
    let ordID=""


    const loc=useLocation();
    const fdt= loc.state.file
    const qdata= loc.state.otherData
    const id= loc.state.id


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


    //region and bucket name
    const S3_BUCKET ='dxfstorage-quickquote';
    const REGION ='us-east-2';



    AWS.config.update(DynamoConfig);

    //instance of s3
    const s3 = new AWS.S3();

    const rf=[]


    useEffect(()=>{
        let s=0

        qdata.map((qd,ind)=>{
            s+=parseFloat(qd.cost)
        })
        setPrc(s)
},[])


    function submit() {


       if (name.trim()=="" && phone.trim()=="" && email.trim()=="" && addr.trim()=="" && city.trim()=="" && state.trim()=="" && zip.trim()=="")
       {
           setErr(true)
       }



       else{
           //set customer details
           let cust={
               name:"",
               phone:"",
               email:"",
               addrs:""
           }

           cust.name= name
           cust.phone=phone
           cust.email=email
           cust.addrs= addr+", "+city+", "+state+", "+zip

           const orderId= uuid();
            ordID=orderId

           const dt=[]


           fdt.map((fl)=>{

               const key=orderId+"_"+fl.file.name

               const params = {
                   Bucket: S3_BUCKET,
                   Key:key,
                   Body: fdt.file,
               };

               rf.push(key)

               const res = s3.putObject(params).promise().catch(err=>
                   notifyErr()
               )

           });

           let sum=0;

           qdata.map((qd,ind)=>{
               sum+=parseFloat(qd.cost)
               qd.fileKey=rf[ind]
               dt.push(qd)
              // setPrc(sum)

           })

           let DynamoDB = new AWS.DynamoDB.DocumentClient();


           const date=new Date().toLocaleString();
           var par = {
               TableName: "Orders",
               Item: {
                   "orderId": orderId,
                   //array of process
                   "orderDate": date,
                   "data": dt,
                   "totalCost":sum,
                   "sellerId": id,
                   "custInfo": cust

               }
           };

           DynamoDB.put(par, function (err) {
               if (err) {
                   console.log(err)
               }
               else{

                   history.push(
                       {
                           pathname: '/OrderSuccess',
                           state: {
                               cust: name.split(" ")[0],
                               ordrId: ordID ,
                           }
                       }
                   )

               }
           });

       }


    }

    return(
        <div>
        <Navbar />
        <div style={{display: "flex",justifyContent:'center',alignItems: 'center'}}>
            <>
                <Card style={DXFParametersCardStyle}>
                    <CardHeader style={DXFParametersCardHeaderStyle}>Customer and Shipping Details</CardHeader>

                    <form style={{alignItems:"center"}}>
                        {err && <label style={{color:"red"}}> Please, provide all the fields</label>}
                        <label htmlFor="fname"><i className="fa fa-user"></i> Full Name</label>
                        <input type="text" id="fname" required={true} name="firstname" onChange={(e)=>setName(e.target.value)} placeholder="John M. Doe"/>
                        <br/>
                        <label htmlFor="fname">Phone</label>
                        <input type="text" id="fname" required={true} name="firstname" onChange={(e)=>setPhone(e.target.value)} placeholder="214123456"/>
                        <br/>
                            <label htmlFor="email"><i className="fa fa-envelope"></i> Email</label>
                            <input type="text" id="email" required={true} name="email" onChange={(e)=>setEmail(e.target.value)} placeholder="john@example.com"/>
                        <br/>
                                <label htmlFor="adr"><i className="fa fa-address-card-o"></i> Address</label>
                                <input type="text" id="adr" required={true} name="address" onChange={(e)=>setaddr(e.target.value)} placeholder="542 W. 15th Street"/>
                        <br/>
                        <label htmlFor="city"><i className="fa fa-institution"></i> City</label>
                        <input type="text" id="city"  name="city" required={true} onChange={(e)=>setCity(e.target.value)} placeholder="New York"/>

                        <div className="row">
                            <div className="col-50" >
                                <label htmlFor="state">State</label>
                                <input type="text" id="state" name="state"  required={true} onChange={(e)=>setState(e.target.value)}placeholder="NY"/>
                                <br/>
                                <label htmlFor="zip">Zip</label>
                                <input type="text" id="zip" name="zip"  required={true} onChange={(e)=>setZip(e.target.value)}placeholder="10001"/>
                            </div>
                        </div>

                    </form>


                  <div style={{marginTop: "5%"}}>
                    <Payment val={prc} />
                    <Button className={"float-right"}  style={{marginTop:"2%"}} onClick={submit} variant="primary" size="sm">Submit</Button>
               </div>
                </Card>



            </>


        </div>
            </div>
    )

}