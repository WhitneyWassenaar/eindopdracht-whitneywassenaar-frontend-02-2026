import Button from "../../ui/Button/Button.jsx";
import logo from "../../../assets/home/logo.svg"

import {useEffect, useState} from "react";

import {NavLink} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar.jsx";
import "./GuestNavbar.css";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.jsx";
 // Wat laatst wordt geladen telt!

function GuestNavbar() {

    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(()=> {
        const handleResize = () => {
            if (window.innerWidth > 800) {
                setMenuOpen(false);
            }
        }
        window.addEventListener("resize",handleResize);
        return () => window.removeEventListener("resize",handleResize);
    },[]);

    return (
        <nav className="nav nav--guest">
            <div className="nav__left">
                <NavLink to="/"> <img src={logo} alt={"Website logo"}/></NavLink>
            </div>

            <div className="nav__center">
                <ul>
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'}
                            to="/"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/functies">Functies</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/contact">Contact</NavLink>
                    </li>
                </ul>
            </div>

            <div className="nav__right">
                <div className="button-wrapper">
                    <Button
                        type={"button"}
                        variant={"default"}
                        buttonPath={"/registreren"}
                    >
                        Registreren
                    </Button>

                    <Button
                        type={"button"}
                        variant={"bordered"}
                        buttonPath={"/inloggen"}
                    >
                        Inloggen
                    </Button>
                </div>

                <Button
                    type={"button"}
                    variant={"hamburgermenu"}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <HamburgerMenu/>
                </Button>
            </div>

                <Sidebar menuOpen={menuOpen}/>
            {menuOpen && (
                <div className="backdrop" onClick={()=> setMenuOpen(false)}/>
            )}
        </nav>

    );
}

export default GuestNavbar;

/*
* TODO:
*  - isLoggedIn is een state, verplaatsen naar app.jsx, als prop doorgeven in GuestNavbar
*  - Class aanmaken voor:
*  - logo
*  Toevoegen:
*  - const isAuth, logout / useContext
*  - AuthContext
*  - Conditional rendering isAuth
*  - column nav als gebruiker is ingelogd
*/

/*
* TODO:
*  In progress:
*  - Link element staat klaar (logo) , staat nu als comment */