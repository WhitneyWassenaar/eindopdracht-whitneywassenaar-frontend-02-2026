import {NavLink} from "react-router-dom";
import Button from "../../ui/Button/Button.jsx";
import logo from "../../../assets/home/logo.svg";
import './UserNavbar.css'
import {useContext} from "react";
import {AuthContext} from "../../authentication/context/AuthContext.jsx";

function UserNavbar() {

    const {logout} = useContext(AuthContext);

    return (
        <nav className="user-nav">
            <div className="nav-content-wrapper">
                <div className="nav__top">
                    <NavLink to="/dashboard"> <img src={logo} alt={"Website logo"}/></NavLink>
                </div>

                <ul className="nav-menu-items">
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/dashboard">Dashboard</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}  to="/paardenbeheer">Paardenbeheer</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/stalbezetting">Stalbezetting</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/zorgtaken">Zorgtaken</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/Contacten">Contacten</NavLink></li>
                    {/*<li><NavLink to="/help">Help</NavLink></li>*/} {/*Later toevoegen*/}
                </ul>
            </div>


            <div className="nav__logout">
                <Button
                    variant={"bordered"}
                    onClick={logout}
                >
                    Uitloggen
                </Button>
            </div>

        </nav>
    )
}

export default UserNavbar;

