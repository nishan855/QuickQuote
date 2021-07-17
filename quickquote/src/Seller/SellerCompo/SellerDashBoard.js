import "./SellerDashBoard.css";
import React from "react";
import SellerNavbar from "./SellerNavbar";
import SellerSidebar from "./SellerSidebar";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Order from "./pages/Order";
import Metrics from "./pages/Metrics"
import Buyers from "../../pages/Buyers";

function SellerDashBoard() {
    return (
        <div className = "main">
            <Router>
                <SellerNavbar/>
                <div className= "main-page">
                <SellerSidebar />
                    <Switch>
                        <Route path = '/metrics' exact component = {Metrics} />

                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default SellerDashBoard