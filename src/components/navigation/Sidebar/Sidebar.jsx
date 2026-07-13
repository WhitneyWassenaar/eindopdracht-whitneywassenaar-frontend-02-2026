import './Sidebar.css';

function Sidebar({menuOpen}) {
    return (
        <aside className={menuOpen ? "sidebar open" : "sidebar"}>
            <a href="/public">Home</a>
            <a href="/functies">Functies</a>
            <a href="/contact">Contact</a>
        </aside>
    );
}

export default Sidebar;