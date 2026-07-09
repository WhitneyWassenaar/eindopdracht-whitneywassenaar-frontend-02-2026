import {NavLink} from "react-router-dom";
import Button from "../../ui/Button/Button.jsx";
import logo from "../../../assets/home/logo.svg";
import './UserNavbar.css'


function UserNavbar() {
    return (
        <nav className="user-nav">
            <div className="nav-content-wrapper">
                <div className="nav__top">
                    <NavLink to="/dashboard"> <img src={logo} alt={"Website logo"}/></NavLink>
                </div>

                <ul>
                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                    <li><NavLink to="/paardenbeheer">Paardenbeheer</NavLink></li>
                    <li><NavLink to="/stalbezetting">Stalbezetting</NavLink></li>
                    <li><NavLink to="/zorgtaken">Zorgtaken</NavLink></li>
                    <li><NavLink to="/Contacten">Contacten</NavLink></li>
                    {/*<li><NavLink to="/help">Help</NavLink></li>*/} {/*Later toevoegen*/}
                </ul>
            </div>


            <div className="nav__logout">
                <Button
                    variant={"bordered"}
                    buttonPath={"/"}
                >
                    Uitloggen
                </Button>
            </div>

        </nav>
    )
}

export default UserNavbar;

