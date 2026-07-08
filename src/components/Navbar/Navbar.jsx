import Button from "../Button/Button.jsx";
import logo from "../../assets/home/logo.svg"
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.jsx";
import {useEffect, useState} from "react";
import "./Navbar.css";
import {NavLink} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar.jsx"; // Wat laatst wordt geladen telt!

function Navbar() {

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
                {/*<Link to={isLoggedIn ? "/dashboard" : "/"}>*/}
                <NavLink to="/"> <img src={logo} alt={"Website logo"}/></NavLink>

                {/*</Link>*/}
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

        //Als menu open is


        // Conditional rendering van de navbar, later gebruiken als state is aangemaakt
        //     <nav className={isLoggedIn ? "nav nav--logged-in" : "nav nav--guest"}>
        //         <img className="logo" src={logo} alt={"Website logo"}/>
        //         {!isLoggedIn ? (
        //             <>
        //                 <ul>
        //                     <li><a href={"/"}>Home</a></li>
        //                     <li><a href={"/"}>Functies</a></li>
        //                     <li><a href={"/"}>Contact</a></li>
        //                 </ul>
        //
        //                 <Button className={"/"}>Registreren</Button>
        //                 <Button className={"/"}>Inloggen</Button>
        //             </>
        //
        //         ) : (
        //             <>
        //                 <ul>
        //                     <li><a href={"/"}>Dashboard</a></li>
        //                     <li><a href={"/"}>Paardenbeheer</a></li>
        //                     <li><a href={"/"}>Stalbezetting</a></li>
        //                     <li><a href={"/"}>Zorgtaken</a></li>
        //                     <li><a href={"/"}>Contacten</a></li>
        //                     <li><a href={"/"}>Help</a></li>
        //                 </ul>
        //
        //                 <Button className={"/"}>Uitloggen</Button>
        //             </>
        //
        // )}
        //
        //
        //     </nav>
    );
}

export default Navbar;

/*
* TODO:
*  - isLoggedIn is een state, verplaatsen naar app.jsx, als prop doorgeven in Navbar
*  - Class aanmaken voor:
*  - logo
*  Toevoegen:
*  - const useNavigate
*  - const isAuth, logout / useContext
*  - AuthContext
*  - NavLink
*  - Conditional rendering isAuth
*  - logo klikbaar > doorsturen naar home
*  - column nav als gebruiker is ingelogd
*/

/*
* TODO:
*  In progress:
*  - Link element staat klaar (logo) , staat nu als comment */