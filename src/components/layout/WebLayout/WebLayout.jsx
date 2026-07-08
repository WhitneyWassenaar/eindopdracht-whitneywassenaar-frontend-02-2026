import Footer from "../Footer/Footer.jsx";
import Navbar from "../../navigation/Navbar.jsx";
import {useState} from "react";
import {Outlet} from "react-router-dom";

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

export default WebLayout