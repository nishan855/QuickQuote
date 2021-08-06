import "./SellerDashBoard.css";
import React, {useState} from "react";
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
import Material from "./pages/Material"
import Home from "../../pages/Home"
import {withAuthenticator} from "@aws-amplify/ui-react";
import {Auth} from "@aws-amplify/auth";


function SellerDashBoard() {
    const [info, setInfo] = useState([])

    const user = Auth.user.attributes.email;
    console.log("kkk " + user);

    if (Auth.user.attributes.email && Auth.currentAuthenticatedUser()) {
        return (
            <div className="main">
                <Router>
                    <Switch>
                        <Route path='/' exact component={Home}/>
                    </Switch>
                    <SellerNavbar/>
                    <div className="main-page">
                        <SellerSidebar/>
                        <Switch>
                            <Route path='/manage_order' exact component={Order}/>
                            <Route path='/' exact component={Home}/>
                            <Route path='/metrics' exact component={Metrics}/>
                            <Route path='/setup' exact component={Parameters}/>
                            <Route path='/profile' exact component={Profile}/>
                            <Route path="/changeParameter" exact component={Parameters}/>
                            <Route path="/material" exact component={Material}/>
                            <Route path="/orderitem" exact component={OrderItem}/>
                            <Route path="/Display" exact component={Display}/>
                            <Route path="/UploadPicture" exact component={UploadPicture}/>

                        </Switch>
                    </div>
                </Router>
            </div>
        );
        // }
    }
}

export default  SellerDashBoard;