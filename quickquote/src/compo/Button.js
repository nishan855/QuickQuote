import React from 'react';
import './Button.css';
import {Link} from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test', 'eric-link'];

const SIZES = ['btn--medium', 'btn--large', 'eric-size'];

export const Button = ({
                           link,
                           children,
                           type,
                           onClick,
                           buttonStyle,
                           buttonSize
                       }) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize)
        ? buttonSize : SIZES[0];

    return(
        <Link to={link} className='btn-mobile'>
            <button
                className = {`btn ${checkButtonStyle} ${checkButtonSize}`}    // Make sure to use a Backtick here
                onClick = {onClick}
                type = {type}
            >
                {children}
            </button>
        </Link>
    );
};


