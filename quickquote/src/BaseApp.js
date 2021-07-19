import React from 'react'
// import Navbar from './compo/Navbar'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'    // 'npm install react-router-dom'
import './BaseApp.css'
import Home from './pages/Home';
import Buyer from './pages/Buyer';
import Seller from "./Seller/SellerCompo/SellerDashBoard";
import Buyers from "./pages/Buyers";
import BuyerHomepage from "./Buyer/BuyerHomepage"


function BaseApp() {
  return (
      <>
        <Router>
          <Switch>
            <Route path = '/' exact component = {Home} />
              <Route path = '/buyers' exact component = {Buyers} />
            <Route path = '/buyer/:id'  component = {Buyer} />
            <Route path = '/seller' exact component = {Seller} />
              <Route path = '/sellerDashboard' exact component = {Seller} />
              //<Route path = '/buyer/:id' component = {BuyerHomepage}
              />



          </Switch>
        </Router>
      </>
  );
}

export default BaseApp
