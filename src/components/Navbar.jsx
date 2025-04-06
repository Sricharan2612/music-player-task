import React from 'react';
import Logo from '../assets/Logo.png';

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="nav-left-menu">
                <img src={Logo} alt="logo" />
                <div className="nav-links">
                    <p className='active-link'>For You</p>
                    <p>Top Tracks</p>
                    <p> Favorites</p>
                    <p>Recently Played</p>
                </div>
            </div>
        </div>
    );
};

export default Navbar;