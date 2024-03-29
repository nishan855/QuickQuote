import React from 'react';
import {Button} from './Button';
import '../BaseApp.css';
import './HeroSection.css';

function HeroSection() {
    return (
        <div className='hero-container'>
            <video src='../videos/video-1.mp4' autoPlay loop muted/>
            <h1>Quick<i class="fab fa-connectdevelop"></i>Quote</h1>
            <p>Providing the most advanced and efficient services</p>
            <div className="hero-btns">
                <Button
                    className='btns'
                    buttonStyle='btn--outline'
                    buttonSize='btn--large'
                    link='/seller'
                >
                    Seller Page
                </Button>
                <Button
                    className='btns'
                    buttonStyle='btn--outline'
                    buttonSize='btn--large'
                    link='/buyers'
                >
                    Buyer Page <i className='far fa-play-cirle'/>
                </Button>
            </div>
        </div>
    );

}

export default HeroSection