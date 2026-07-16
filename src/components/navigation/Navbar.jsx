// React
import {useContext} from "react";

//Context
import {AuthContext} from "../authentication/context/AuthContext.jsx";

// Components
import GuestNavbar from './GuestNavbar/GuestNavbar.jsx';
import UserNavbar from './UserNavbar/UserNavbar.jsx';

function Navbar() {
    const {user} = useContext(AuthContext);
    return (
        <>
            {!user
                ?  <GuestNavbar/>
                : <UserNavbar/>}
        </>
    );
}

export default Navbar;