import {useLocation} from 'react-router-dom'
import React, {useEffect} from "react";
import Navbar from "../compo/Navbar";

const QuoteError=()=>{
     const loc =useLocation()

    return(
        <div>
            <Navbar style={{marginBottom:"2%"}}/>
            <label>Your {loc.state.message}.</label>
            <label>     Please, try again.....</label>
        </div>

    );
}
export default QuoteError;