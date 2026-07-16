// React
import {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';

// Components
import Button from '../../ui/Button/Button.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu.jsx';

// Assets
import logo from '../../../assets/home/logo.svg';

// CSS
import './GuestNavbar.css';

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