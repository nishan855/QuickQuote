import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../compo/Navbar";
import DragDropCard from "../compo/Buyer/DragDropCard";
import DXFParametersCard from "../compo/Buyer/DXFParametersCard";
import PaymentCard from "../compo/Buyer/PaymentCard";

export default function Buyer () {


    return (
        <>
            <Navbar/>
            <h1> HEY Team Laminar! </h1>
            <DragDropCard/>
            <DXFParametersCard/>
            <PaymentCard/>

        </>

    );

}