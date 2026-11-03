// React Router
import {NavLink} from 'react-router-dom';

// CSS
import './Sidebar.css';

function Sidebar({menuOpen}) {
    return (
        <aside className={menuOpen ? "sidebar open" : "sidebar"}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/functies">Functies</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/inloggen">Inloggen</NavLink>
            <NavLink to="/registreren">Registreren</NavLink>
        </aside>
    );
}

export default Sidebar;