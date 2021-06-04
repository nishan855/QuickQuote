import React from 'react';
import CardItem from './CardItem';
import './Cards.css';

function Cards () {
    return (
        <div className='cards'>
            <h1>Check out these EPIC Destinations!</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem   // Passing props into CardItem
                        src = "/images/img-9.jpeg"
                        text = "Explore the hidden waterfall deep
                        inside the Amazon Jungle"
                        label = 'Adventure'
                        path = '/seller'
                        />
                        <CardItem   // Passing props into CardItem
                            src = "/images/img-2.jpeg"
                            text = "Travel through the islands of Bali in a private cruise!"
                            label = 'Luxury'
                            path = '/seller'
                        />
                    </ul>
                    <ul className="cards__items">
                        <CardItem   // Passing props into CardItem
                            src = "/images/img-9.jpeg"
                            text = "Explore the hidden waterfall deep
                        inside the Amazon Jungle"
                            label = 'Adventure'
                            path = '/seller'
                        />
                        <CardItem   // Passing props into CardItem
                            src = "/images/img-2.jpeg"
                            text = "Travel through the islands of Bali in a private cruise!"
                            label = 'Luxury'
                            path = '/seller'
                        />
                        <CardItem   // Passing props into CardItem
                            src = "/images/img-2.jpeg"
                            text = "Travel through the islands of Bali in a private cruise!"
                            label = 'Luxury'
                            path = '/seller'
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Cards