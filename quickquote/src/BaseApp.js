import React from 'react'
import Navbar from './compo/Navbar'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'    // 'npm install react-router-dom'
import './BaseApp.css'
import Home from './compo/pages/Home';
import Sellers from './compo/pages/Sellers';
import Buyer from './compo/pages/Buyer';
import SignUp from './compo/pages/SignUp';
import {withAuthenticator} from "@aws-amplify/ui-react";

function BaseApp() {
  return (
      <>
        <Router>
          <Navbar />
          <Switch>
            <Route path = '/' exact component = {Home} />
            <Route path = '/buyer' exact component = {Buyer} />
            <Route path = '/seller' exact component = {Sellers} />
            <Route path = '/signup' exact component = {SignUp} />
          </Switch>
        </Router>
      </>
  );
}

export default BaseApp