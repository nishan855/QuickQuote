import {useLocation} from 'react-router-dom'
import {useEffect} from "react";

function Orders(props){
    const location=useLocation()
    const val=location.state
    useEffect(()=>console.log(val),[val])
return(<h1>
here

</h1>);
}
export default Orders;
