import GuestNavbar from './GuestNavbar/GuestNavbar.jsx';
import UserNavbar from './UserNavbar/UserNavbar.jsx';

function Navbar({isLoggedIn}) {
    return (
        <>
            {!isLoggedIn
                ?  <GuestNavbar/>
                : <UserNavbar/>}
        </>
    );
}

export default Navbar;