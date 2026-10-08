// React
import {Outlet} from 'react-router-dom';

// Components
import Navbar from '../../navigation/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';

// CSS
import './WebLayout.css'

function WebLayout() {
    return (
            <div className="web-layout">
                <Navbar/>
                <main className="web-content">
                    <Outlet/>
                </main>
                <Footer/>
            </div>
    );
}

export default WebLayout;