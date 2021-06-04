import React from 'react'
import Navbar from './compo/Navbar'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'    // 'npm install react-router-dom'
import './BaseApp.css'
import Home from './compo/pages/Home';
import Buyer from './compo/pages/Buyer';
import Seller from './compo/pages/Seller';
import SignUp from './compo/pages/SignUp';

function BaseApp() {
  return (
      <>
        <Router>
          <Navbar />
          <Switch>
            <Route path = '/' exact component = {Home} />
            <Route path = '/buyer' exact component = {Buyer} />
            <Route path = '/seller' exact component = {Seller} />
            <Route path = '/sign-up' exact component = {SignUp} />
          </Switch>
        </Router>
      </>
  );
}

export default BaseApp