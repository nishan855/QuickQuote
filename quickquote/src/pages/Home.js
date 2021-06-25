import React from 'react'
import '../App.css'
import HeroSection from '../compo/HeroSection'
import Cards from '../compo/Cards'
import Footer from '../compo/Footer'
import Navbar from "../compo/Navbar";

function Home () {
    return (
        <>
             <Navbar />
            <HeroSection/>
            <Footer />
        </>
    );
}

export default Home