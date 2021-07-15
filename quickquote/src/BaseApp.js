import React from 'react'
// import Navbar from './compo/Navbar'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'    // 'npm install react-router-dom'
import './BaseApp.css'
import Home from './pages/Home';
import Buyer from './pages/Buyer';
import SellerDB from "./Seller/SellerDashBoard";
import Parameters from "./Seller/Parameters";
import BuyerHomepage from "./Buyer/BuyerHomepage"
import Buyers from "./pages/Buyers";

function BaseApp() {
  return (
      <>
        <Router>
          <Switch>
            <Route path = '/' exact component = {Home} />
              <Route path = '/buyers' exact component = {Buyers} />
            <Route path = '/buyer/placeOrder/:id'  component = {Buyer} />
            <Route path = '/seller' component = {SellerDB} />
            <Route path = '/sellerDashboard' component = {SellerDB}/>
              <Route path = '/sellerProfile' component = {SellerDB} />
              <Route path = '/sellerOrders' component = {SellerDB} />
              <Route  path = '/changeParameter' component = {Parameters} />
              <Route path = '/buyer/:id'  component = {BuyerHomepage} />

          </Switch>
        </Router>
      </>
  );
}

export default BaseApp