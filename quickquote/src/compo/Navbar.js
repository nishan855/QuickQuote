import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
// import { Button } from './Button';
import './Navbar.css';


function Navbar() {
    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)

    const handleClick = () => setClick (!click)
    const closeMobileMenu = () => setClick(false);

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
                                to='/'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Home
                            </Link>
                        </li>

                        <li className = 'nav-item'>
                            <Link
                                to='/buyers'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Buyer
                            </Link>
                        </li>
                        <li className = 'nav-item'>
                            <Link
                                to='/seller'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Seller
                            </Link>
                        </li>
                        <li className = 'nav-item'>
                            <Link
                                to='/sign-up'
                                className='nav-links-mobile'
                                onClick={closeMobileMenu}
                            >
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar