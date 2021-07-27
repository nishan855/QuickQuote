import {useLocation} from "react-router-dom";

export default function OrderItem(){

    const location=useLocation()
    const orderDat=location.state.ordrData
    console.log(orderDat)
    return(
        <h1/>
    )
}