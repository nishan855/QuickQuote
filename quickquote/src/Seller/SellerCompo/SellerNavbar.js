import React, {useState, useEffect} from 'react';
import { Auth } from '@aws-amplify/auth';
import awsconfig from "../../aws-exports";
import SignUp from "../../pages/Signup";
import {AmplifySignOut, withAuthenticator} from '@aws-amplify/ui-react'
import "./SellerDashBoard.css";
import '../../compo/Navbar.css';
import Amplify from "aws-amplify";
import {Link, useHistory} from "react-router-dom";

Amplify.configure(awsconfig);

function SellerNavbar() {
    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)

    const handleClick = () => setClick (!click)
    const closeMobileMenu = () => setClick(false);



    //sign out
    async function signout(){
        alert("Are you sure you want to sign out?")
        try {
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }

    }
    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };
    // Eliminates Sign-Up button on refresh
    useEffect(() => {
        showButton()
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className = "navbar">
                <div className = "navbar-container">
                  <div className= "logo"> <Link
                        to ="/seller"
                        className = 'navbar-logo'
                        onClick = {closeMobileMenu} // Close menu from Logo button
                    >
                        Quick<i class="fab fa-connectdevelop"></i>Quote
                    </Link>
                  </div>
                    <div
                        className = 'menu-icon'
                        onClick={handleClick} >
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>


                        <li className = 'nav-item'>
                            <Link
                                to='/sellerDashboard'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Dashboard
                            </Link>
                        </li>


                        <li className = 'nav-item'>
                        <AmplifySignOut/>
                        </li>


                    </ul>
                </div>
            </nav>
        </>
    )
}

export default withAuthenticator(SellerNavbar);

