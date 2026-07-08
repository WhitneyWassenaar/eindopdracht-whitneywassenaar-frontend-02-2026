import "./Footer.css";
import logo from "../../assets/home/logo.svg";

function Footer() {
    return (
        <footer className="footer">
            <div className="branding">
                <img src={logo} alt="EquiManager branding logo"/>
                <p>EquiManager is een gebruiksvriendelijke paardenmanagement-applicatie <br/> waarmee stalhouders alle informatie van hun paarden centraal kunnen beheren <br/>- alles overzichtelijk op één plek.</p>
            </div>

            <hr/>

            <p className="copyright">Copyright © 2026 EquiManager designed by Whitney Wassenaar</p>
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