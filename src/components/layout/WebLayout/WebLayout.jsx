import {useState} from 'react';
import {Outlet} from 'react-router-dom';

import Navbar from '../../navigation/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';

function WebLayout() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    return (
        <>
            <Navbar isLoggedIn={isLoggedIn}/>
            <div className="inner-container">
                <Outlet />
            </div>
            <Footer/>
        </>
    );
}

export default WebLayout;

// Check of setIsLoggedIn nog  nodig is.