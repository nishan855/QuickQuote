import "./SellerDashBoard.css";
import React from "react";
import SellerNavbar from "./SellerNavbar";
import SellerSidebar from "./SellerSidebar";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Order from "./pages/Order";
import Metrics from "./pages/Metrics"

function SellerDashBoard() {
    return (
        <div className = "main">
            <Router>
            <SellerNavbar/>
            <SellerSidebar />
                <Switch>
                    <Route exact path = '/metrics' exact component = {Metrics} />
                </Switch>
            </Router>
        </div>
    );
}

export default SellerDashBoard