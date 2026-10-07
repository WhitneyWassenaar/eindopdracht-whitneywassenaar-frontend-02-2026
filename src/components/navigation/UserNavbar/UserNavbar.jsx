import {useContext, useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';

// Components
import Button from '../../ui/Button/Button.jsx';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu.jsx';

// Context
import {AuthContext} from '../../../context/AuthContext.jsx';

// Assets
import logo from '../../../assets/home/logo.svg';

// CSS
import './UserNavbar.css';

function UserNavbar() {
    const {logout} = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 800) {
                setMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className={`user-nav ${menuOpen ? 'user-nav--open' : ''}`}>

            <div className="nav-content-wrapper">

                <div className="nav__top">
                    <NavLink to="/dashboard">
                        <img src={logo} alt="Website logo"/>
                    </NavLink>

                    <div className="dashboard-hamburger">
                        <HamburgerMenu
                            onClick={() => setMenuOpen(!menuOpen)}
                        />
                    </div>
                </div>

                <ul className="nav-menu-items">
                    <li>
                        <NavLink
                            className={({isActive}) =>
                                isActive ? 'active-menu-link' : 'default-menu-link'
                            }
                            to="/dashboard"
                            onClick={closeMenu}
                        >
                            Dashboard
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            className={({isActive}) =>
                                isActive ? 'active-menu-link' : 'default-menu-link'
                            }
                            to="/paardenbeheer"
                            onClick={closeMenu}
                        >
                            Paardenbeheer
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            className={({isActive}) =>
                                isActive ? 'active-menu-link' : 'default-menu-link'
                            }
                            to="/stalbezetting"
                            onClick={closeMenu}
                        >
                            Stalbezetting
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            className={({isActive}) =>
                                isActive ? 'active-menu-link' : 'default-menu-link'
                            }
                            to="/zorgtaken"
                            onClick={closeMenu}
                        >
                            Zorgtaken
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            className={({isActive}) =>
                                isActive ? 'active-menu-link' : 'default-menu-link'
                            }
                            to="/contacten"
                            onClick={closeMenu}
                        >
                            Contacten
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className="nav__logout">
                <Button
                    variant="bordered"
                    onClick={logout}
                >
                    Uitloggen
                </Button>
            </div>

        </nav>
    );
}

export default UserNavbar;