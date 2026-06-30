import "./Footer.css";
import logo from "../../assets/logo.svg";

function Footer() {
    return (
        <footer>
            <div>
                <img src={logo} alt="EquiManager branding logo"/>
                <p>EquiManager is een gebruiksvriendelijke paardenmanagement-applicatie waarmee stalhouders alle informatie van hun paarden centraal kunnen beheren - alles overzichtelijk op één plek.</p>
            </div>

            <hr/>

            <p>Copyright © 2026 EquiManager designed by Whitney Wassenaar</p>
        </footer>
    );
}

export default Footer;

/*
* TODO:
*  - Class maken voor:
*  - Footer
*  - Logo en bijbehorende branding tekst helderheid aanpassen
*/