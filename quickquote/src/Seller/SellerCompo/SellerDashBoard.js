import "./SellerDashBoard.css";
import React from "react";
import SellerNavbar from "./SellerNavbar";
import SellerSidebar from "./SellerSidebar";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Setup from "./pages/Setup";
import Profile from "./pages/Profile";
import Metrics from "./pages/Metrics"
import Parameters from "./Parameters"
import Order from "./pages/Order"
import OrderItem from "./pages/OrderItem"
import Display from "./pages/Display"
import UploadPicture from "./pages/UploadPicture"

function SellerDashBoard() {
    return (
        <div className = "main">
            <Router>
                <SellerNavbar/>
                <div className= "main-page">
                <SellerSidebar />
                    <Switch>
                        <Route path = '/manage_order' exact component = {Order} />
                        <Route path = '/metrics' exact component = {Metrics} />
                        <Route path = '/setup' exact component = {Parameters} />
                        <Route path = '/profile' exact component = {Profile} />
                        <Route path = "/changeParameter" exact component = {Parameters} />
                        <Route path = "/orderitem" exact component = {OrderItem} />
                        <Route path = "/Display" exact component = {Display} />
                        <Route path = "/UploadPicture" exact component = {UploadPicture} />

                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default SellerDashBoard