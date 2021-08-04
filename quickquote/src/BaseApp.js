import React from 'react'
// import Navbar from './compo/Navbar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'    // 'npm install react-router-dom'
import './BaseApp.css'
import QuoteError from "./pages/QuoteError";
import Home from './pages/Home';
import Buyer from './pages/Buyer';
import Seller from "./Seller/SellerCompo/SellerDashBoard";
import Buyers from "./pages/Buyers";
import Orders from "./pages/quote";
import CustomerInfo from "./pages/CustomerInfo"
import Payment from "./pages/Payment"

function BaseApp() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/buyers' exact component={Buyers}/>
                    <Route path='/quote' component={Orders}/>
                    <Route path='/quoteerror' component={QuoteError}/>
                    <Route path='/buyer/:id' component={Buyer}/>
                    <Route path='/seller' exact component={Seller}/>
                    {/*<Route path='/sellerDashboard' exact component={Seller}/>*/}
                    <Route path='/custinfo' exact component={CustomerInfo}/>
                </Switch>
            </Router>
        </>
    );
}

export default BaseApp