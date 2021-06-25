import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Auth } from '@aws-amplify/auth';
import awsconfig from "../../aws-exports";
import {AmplifySignOut, withAuthenticator} from '@aws-amplify/ui-react'
import '../../compo/Navbar.css';
import Amplify from "aws-amplify";

Amplify.configure(awsconfig);


function SellerNavbar() {
    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)

    const handleClick = () => setClick (!click)
    const closeMobileMenu = () => setClick(false);

    //sign out
    async function signout(){
        alert("Are you sure you want to sign out?")
        await Auth.signOut();
    }
    // Shrinks button when window reduced
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
                    <Link
                        to ="/"
                        className = 'navbar-logo'
                        onClick = {closeMobileMenu} // Close menu from Logo button
                    >
                        QUICK-QUOTE <i className="fab fa-typo3"></i>
                    </Link>
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
                                Home
                            </Link>
                        </li>


                        <li className = 'nav-item'>
                            <Link
                                to='/sellerProfile'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                               Profile
                            </Link>
                        </li>

                        <li className = 'nav-item'>
                            <Link
                                to='/sellerOrders'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Orders
                            </Link>
                        </li>

                        <li className = 'nav-item'>
                            <Link
                                to='/'
                                className='nav-links'
                                onClick={signout}
                            >
                                Signout
                            </Link>
                        </li>


                    </ul>
                </div>
            </nav>
        </>
    )
}

export default withAuthenticator(SellerNavbar);