import "./HamburgerMenu.css";

function HamburgerMenu({onClick}) {
    return (
        <div className="hamburger-menu" type="button" onClick={onClick} >
            <div className="menu"></div>
        </div>

    );
}

export default HamburgerMenu;