// React
import {Outlet} from 'react-router-dom';

// Components
import Navbar from '../../navigation/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';

function WebLayout() {
    return (
        <>
            <Navbar />
            <div className="inner-container">
                <Outlet />
            </div>
            <Footer/>
        </>
    );
}

export default WebLayout;

// Check of setIsLoggedIn nog  nodig is.