import "./HamburgerMenu.css";

function HamburgerMenu({onClick}) {
    return (
        <button className="hamburger-menu" type="button" onClick={onClick} >
            <div className="menu"></div>
        </button>

    );
}

export default HamburgerMenu;