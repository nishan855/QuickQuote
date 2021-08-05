import "./SellerDashBoard.css";
import React from "react";
import SellerNavbar from "./SellerNavbar";
import SellerSidebar from "./SellerSidebar";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Setup from "./pages/Setup";
import Metrics from "./pages/Metrics"
import Parameters from "./Parameters"
import Material from "./pages/Material";
import Home from "../../pages/Home"


function SellerDashBoard() {
    return (
        <div className = "main">
            <Router>
                <Switch>
                    <Route path = '/' exact component = {Home}/>
                </Switch>
                <SellerNavbar/>
                <div className= "main-page">
                <SellerSidebar />
                    <Switch>
                        <Route path = '/' exact component = {Home}/>
                        <Route path = '/metrics' exact component = {Metrics} />
                        <Route path = '/setup' exact component = {Parameters} />
                        <Route path = '/material' exact component = {Material} />
                        <Route path = "/changeParameter" exact component = {Parameters} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default SellerDashBoard