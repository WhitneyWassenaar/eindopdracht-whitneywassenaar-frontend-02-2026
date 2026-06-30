import "./Footer.css";
import logo from "../../assets/logo.svg";

function Footer({brandText, footerText}) {
    return (
        <footer>
            <div>
                <img src={logo} alt="EquiManager branding logo"/>
                <p>{brandText}</p>
            </div>

            <hr/>

            <p>{footerText}</p>
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