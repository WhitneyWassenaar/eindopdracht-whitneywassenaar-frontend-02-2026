import "./Navbar.css";
import Button from "../Button/Button.jsx";
import logo from "../../assets/logo.svg"

function Navbar() {
    return (
        <nav className={isLoggedIn ? "nav nav--logged-in" : "nav nav--guest"}>
            <img className="logo" src={logo} alt={"Website logo"}/>
            {!isLoggedIn ? (
                <>
                    <ul>
                        <li><a href={"/"}>Home</a></li>
                        <li><a href={"/"}>Functies</a></li>
                        <li><a href={"/"}>Contact</a></li>
                    </ul>

                    <Button className={"/"}>Registreren</Button>
                    <Button className={"/"}>Inloggen</Button>
                </>

            ) : (
                <>
                    <ul>
                        <li><a href={"/"}>Dashboard</a></li>
                        <li><a href={"/"}>Paardenbeheer</a></li>
                        <li><a href={"/"}>Stalbezetting</a></li>
                        <li><a href={"/"}>Zorgtaken</a></li>
                        <li><a href={"/"}>Contacten</a></li>
                        <li><a href={"/"}>Help</a></li>
                    </ul>

                    <Button className={"/"}>Uitloggen</Button>
                </>

    )}


        </nav>
    );
}

export default Navbar;

/*
* TODO:
*  - isLoggedIn is een state, verplaatsen naar app.jsx, als prop doorgeven in Navbar
*  - Class aanmaken voor:
*  - nav
*  - nav--logged-in
*  - nav--guest
*  - logo
*/