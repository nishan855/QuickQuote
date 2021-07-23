import React from 'react'
import { Button } from './Button'
import './Footer.css';
import {Link} from 'react-router-dom'

function Footer() {
    return (
        <div className='footer-container'>
            <section className="footer-subscription">
                <p className="footer-subscription-heading">
                    Join our newsletter to recieve our best deals!
                </p>
                <p className="input-areas">
                    You can unsubscribe at any time.
                </p>
                <div className="input-areas">
                    <form>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="footer-input"
                        />
                        <Button buttonStyle='btn--outline'>Subscribe</Button>
                    </form>
                </div>
            </section>
            <div className='footer-links'>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>About Us</h2>
                        <Link to='/sign-up'>How it works</Link>
                        <Link to='/buyer'>Testimonials</Link>
                        <Link to='/'>Careers</Link>
                        <Link to='/'>Investors</Link>
                        <Link to='/'>Terms of Service</Link>
                    </div>
                    <div className='footer-link-items'>
                        <h2>Seller Pages</h2>
                        <Link to='/buyer/7b8f0eca-1eb9-43e4-9ab2-80a27da75e84'>Nishan</Link>
                        <Link to='/'>Eric</Link>
                        <Link to='/'>Sindhu</Link>
                        <Link to='/'>Alisha</Link>
                        <Link to='/'>Laith</Link>>
                    </div>
                </div>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>Videos</h2>
                        <Link to='/'>Submit Video</Link>
                        <Link to='/'>Ambassadors</Link>
                        <Link to='/'>Agency</Link>
                        <Link to='/'>Influencer</Link>
                    </div>
                    <div className='footer-link-items'>
                        <h2>Social Media</h2>
                        <Link to='/'>Instagram</Link>
                        <Link to='/'>Facebook</Link>
                        <Link to='/'>Youtube</Link>
                        <Link to='/'>Twitter</Link>
                    </div>
                </div>
            </div>
            <section className='social-media'>
                <div className='social-media-wrap'>
                    <div className='footer-logo'>
                        <Link to='/' className='social-logo'>
                            QUICK-QUOTE
                            <i className='fab fa-typo3'/>
                        </Link>
                    </div>
                    <small className='website-rights'>QUICK-QUOTE © 2020</small>
                    <div className='social-icons'>
                        <Link
                            class='social-icon-link facebook'
                            to='/'
                            target='_blank'
                            aria-label='Facebook'
                        >
                            <i className='fab fa-facebook-f'/>
                        </Link>
                        <Link
                            class='social-icon-link instagram'
                            to='/'
                            target='_blank'
                            aria-label='Instagram'
                        >
                            <i className='fab fa-instagram'/>
                        </Link>
                        <Link
                            class='social-icon-link youtube'
                            to='/'
                            target='_blank'
                            aria-label='Youtube'
                        >
                            <i className='fab fa-youtube'/>
                        </Link>
                        <Link
                            class='social-icon-link twitter'
                            to='/'
                            target='_blank'
                            aria-label='Twitter'
                        >
                            <i className='fab fa-twitter'/>
                        </Link>
                        <Link
                            class='social-icon-link twitter'
                            to='/'
                            target='_blank'
                            aria-label='LinkedIn'
                        >
                            <i className='fab fa-linkedin'/>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Footer