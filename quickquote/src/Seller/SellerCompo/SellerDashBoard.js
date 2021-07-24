import "./SellerDashBoard.css";
import React from "react";
import SellerNavbar from "./SellerNavbar";
import SellerSidebar from "./SellerSidebar";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Setup from "./pages/Setup";
import Metrics from "./pages/Metrics"
import Parameters from "./Parameters"


function SellerDashBoard() {
    return (
        <div className = "main">
            <Router>
                <SellerNavbar/>
                <div className= "main-page">
                <SellerSidebar />
                    <Switch>
                        <Route path = '/metrics' exact component = {Metrics} />
                        <Route path = '/setup' exact component = {Parameters} />
                        <Route path = "/changeParameter" exact component = {Parameters} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default SellerDashBoard